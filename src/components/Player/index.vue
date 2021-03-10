<template>
  <div class="player">
    <audio preload :src="songData.src" ref="music"></audio>
    <div class="playerButton">
      <button class="iconfont" @click="previousSong">&#xe62b;</button>
      <button class="iconfont" v-if="!isPlay" @click="playingMusic">
        &#xe60f;
      </button>
      <button class="iconfont" v-else @click="playingMusic">&#xe613;</button>
      <button class="iconfont" @click="nextSong">&#xe62b;</button>
    </div>
    <div class="playerData">
      <img
        :src="playingSong.picUrl || require('@/assets/img/logo.png')"
        alt=""
        class="playerImg"
        @click="goSongPage"
      />
      <div class="playerDetail">
        <div class="playerWords">
          <div class="songData">
            <span>{{ playingSong.name }}</span> -
            <span>{{ playingSong.artists }}</span>
          </div>
          <div class="songTime">{{ timeData }}</div>
        </div>
        <div class="playerProgress" @click="clickProgress">
          <div
            class="playerBuffered"
            :style="`width: ${playerBufferedPosition}%`"
          ></div>
          <div
            class="playerCurrent"
            :style="`width: ${playingPosition}%`"
          ></div>
          <div
            class="progressButton"
            v-if="!isBuffering"
            :style="`left: ${playingPosition}%`"
            @mousedown.stop="progressButtonMousedown"
          ></div>
          <div
            class="progressBufferingButton"
            v-else
            :style="`left: ${playingPosition}%`"
            @mousedown.stop="progressButtonMousedown"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="playerVoice">
      <div class="voiceImg iconfont">&#xe752;</div>
      <div class="voiceProgress" @click="clickProgress">
        <div class="Playeringvoice" :style="`width: ${voicePosition}%`"></div>
        <div
          class="progressButton"
          :style="`left: ${voicePosition}%`"
          @mousedown.stop="progressButtonMousedown"
        ></div>
      </div>
    </div>
    <div class="playerOther">
      <div class="playerListButton iconfont" @click="setPlayerList">
        &#xe600;
      </div>
      <transition name="hasPlayerList">
        <PlayerList v-if="hasPlayerList" :setPlayerList="setPlayerList" />
      </transition>
    </div>
  </div>
</template>

<script>
import netease from "@/api/netease";
import qq from "@/api/qq";
import { mapGetters } from "vuex";
import { secondsToMinutes } from "@/libs/tool";
import PlayerList from "./PlayerList";
// 播放位置的互斥锁与延时函数的标识
let playProgressFlag = true;
let timerId;
export default {
  name: "Player",
  components: {
    PlayerList
  },
  data() {
    return {
      songData: {
        src: "",
        duration: 0
      },
      isPlay: false,
      isBuffering: true,
      hasPlayerList: false,
      // 这下面的private属性请使用计算属性进行修改
      privatePlayerBufferedPosition: 0,
      privatePlayingPosition: 0,
      privateVoicePosition: 100
    };
  },

  computed: {
    playerBufferedPosition: {
      get() {
        return this.privatePlayerBufferedPosition;
      },
      set(val) {
        if (val >= 0 && val <= 100) {
          this.privatePlayerBufferedPosition = val;
        }
      }
    },
    playingPosition: {
      get() {
        return this.privatePlayingPosition;
      },
      set(val) {
        if (val >= 0 && val <= 100) {
          this.privatePlayingPosition = val;
        }
      }
    },
    voicePosition: {
      get() {
        return this.privateVoicePosition;
      },
      set(val) {
        if (val >= 0 && val <= 100) {
          this.privateVoicePosition = val;
        }
      }
    },
    playingTime() {
      return (this.playingPosition / 100) * this.songData.duration;
    },
    timeData() {
      const songTime = secondsToMinutes(this.songData.duration).join(":");
      const playTime = secondsToMinutes(this.playingTime).join(":");
      return `${playTime} / ${songTime}`;
    },
    ...mapGetters(["playingSong"])
  },
  watch: {
    playingSong(val, oldVal) {
      if (val.id !== oldVal.id) {
        this.isPlay = false;
        this.songData.src = "";
        this.songData.duration = 0;
        this.playerBufferedPosition = 0;
        this.playingPosition = 0;
        this.isBuffering = true;
        if (this.playingSong.id) {
          if (this.playingSong.source === "netease") {
            netease.getSongData(this.playingSong.id).then(suc => {
              this.songData.src = suc.playSong.url;
              if (!this.playingSong.lyric) {
                this.$store.commit("setPlayinglyric", suc.lyric.lrc.lyric);
              }
            });
          } else if (this.playingSong.source === "qq") {
            Promise.all([
              qq.getSongUrl(this.playingSong.id),
              qq.getlyric(this.playingSong.id)
            ])
              .then(res => {
                let [url, lyric] = res;
                this.songData.src =
                  url.req_0.data.sip[1] + url.req_0.data.midurlinfo[0].purl;
                if (!this.playingSong.lyric) {
                  this.$store.commit("setPlayinglyric", lyric.lyric);
                }
              })
              .catch(() => {
                this.$store.commit("removePlayListItem", {
                  type: "index",
                  val: this.playingSong.index
                });
                this.$toast({
                  text: "该歌曲无法播放",
                  type: "danger",
                  duration: 1000
                });
              });
          }
        } else {
          this.isBuffering = false;
        }
      }
    }
  },
  mounted() {
    this.$store.commit("setMusicDom", this.$refs.music);
    if (this.playingSong.id) {
      if (this.playingSong.source === "netease") {
        netease.getSongData(this.playingSong.id).then(suc => {
          this.songData.src = suc.playSong.url;
          if (!this.playingSong.lyric) {
            this.$store.commit("setPlayinglyric", suc.lyric.lrc.lyric);
          }
        });
      } else if (this.playingSong.source === "qq") {
        Promise.all([
          qq.getSongUrl(this.playingSong.id),
          qq.getlyric(this.playingSong.id)
        ])
          .then(res => {
            let [url, lyric] = res;
            this.songData.src =
              url.req_0.data.sip[1] + url.req_0.data.midurlinfo[0].purl;
            if (!this.playingSong.lyric) {
              this.$store.commit("setPlayinglyric", lyric.lyric);
            }
          })
          .catch(() => {
            this.$store.commit("removePlayListItem", {
              type: "index",
              val: this.playingSong.index
            });
            this.$toast({
              text: "该歌曲无法播放",
              type: "danger",
              duration: 1000
            });
          });
      }
    } else {
      this.isBuffering = false;
    }
    this.$refs.music.addEventListener("play", () => {
      this.isPlay = true;
    });
    this.$refs.music.addEventListener("pause", () => {
      this.isPlay = false;
    });
    this.$refs.music.addEventListener("canplay", () => {
      this.isPlay = true;
      this.$refs.music.play();
      this.isBuffering = false;
      this.songData.duration = this.$refs.music.duration;
    });
    this.$refs.music.addEventListener("waiting", () => {
      this.isBuffering = true;
    });
    this.$refs.music.addEventListener("progress", this.getbuff);
    this.$refs.music.addEventListener("timeupdate", this.getePlayingPosition);
  },
  methods: {
    playingMusic() {
      if (this.isPlay) {
        this.$refs.music.pause();
      } else if (this.playingSong.id) {
        this.$refs.music.play();
      }
    },
    // 控制播放列表的显隐
    setPlayerList() {
      this.hasPlayerList = !this.hasPlayerList;
    },
    // 拖拽事件函数
    progressButtonMousedown(event1) {
      clearTimeout(timerId);
      playProgressFlag = false;
      const domLeft = event1.currentTarget.parentElement.offsetLeft;
      const domWidth = event1.currentTarget.parentElement.offsetWidth;
      const domClass = event1.currentTarget.parentElement.className;
      const moveFu = event2 => {
        if (domClass === "playerProgress") {
          this.playingPosition = ((event2.clientX - domLeft) / domWidth) * 100;
        } else if (domClass === "voiceProgress") {
          this.voicePosition = ((event2.clientX - domLeft) / domWidth) * 100;
          this.$refs.music.volume = this.voicePosition / 100;
        }
      };
      const upFn = () => {
        if (domClass === "playerProgress") {
          playProgressFlag = true;
          this.$refs.music.currentTime = this.playingTime;
        }
        window.removeEventListener("mousemove", moveFu);
        window.removeEventListener("mouseup", upFn);
      };
      window.addEventListener("mousemove", moveFu);
      window.addEventListener("mouseup", upFn);
    },
    // 进度条点击事件函数
    clickProgress(event) {
      if (event.currentTarget.className === "playerProgress") {
        this.playingPosition =
          ((event.clientX - event.currentTarget.offsetLeft) /
            event.currentTarget.offsetWidth) *
          100;
        this.$refs.music.currentTime = this.playingTime;
      } else if (event.currentTarget.className === "voiceProgress") {
        this.$refs.music.volume =
          (event.clientX - event.currentTarget.offsetLeft) /
          event.currentTarget.offsetWidth;
        this.voicePosition = this.$refs.music.volume * 100;
      }
    },
    // 获取缓冲进度
    getbuff() {
      const { music } = this.$refs;
      for (let i = 0; i < music.buffered.length; i++) {
        if (this.$refs.music.buffered.end(i) > this.$refs.music.currentTime) {
          this.playerBufferedPosition =
            (this.$refs.music.buffered.end(i) / this.$refs.music.duration) *
            100;
          break;
        }
      }
    },
    // 获取播放进度
    getePlayingPosition() {
      if (playProgressFlag) {
        playProgressFlag = false;
        this.playingPosition =
          (this.$refs.music.currentTime / this.$refs.music.duration) * 100;
        timerId = setTimeout(() => {
          playProgressFlag = true;
        }, 200);
      }
    },
    nextSong() {
      this.$store.commit("playNextSong");
    },
    previousSong() {
      this.$store.commit("playPreviousSong");
    },
    goSongPage() {
      if (this.playingSong.id) {
        if (this.$router.history.current.path === "/song") {
          this.$router.go(-1);
        } else {
          this.$router.push("/song");
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.player {
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  background: rgb(246, 246, 248);
  border: rgb(225, 225, 226) solid 1px;
  user-select: none;
}
.playerButton {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 0 20px;
    width: 40px;
    height: 40px;
    border: 2px #000 solid;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    &:first-of-type {
      transform: rotate(180deg);
    }
  }
}
.playerData {
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  > .playerImg {
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid #aaa;
    box-shadow: 0 0 5px 0 #888;
    cursor: pointer;
  }
}
.playerDetail {
  width: 90%;
}
.playerWords {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .songData {
    font-size: 12px;
    color: #000;
    line-height: 1em;
    span:last-of-type {
      color: #999;
    }
  }
  > .songTime {
    font-size: 12px;
    line-height: 1em;
    color: #999;
  }
}
.playerProgress {
  position: relative;
  margin: 10px 0;
  width: 100%;
  height: 5px;
  background: #ddd;
  border-radius: 5px;
  .playerBuffered {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #999;
    border-radius: 5px;
  }
  .playerCurrent:extend(.playerProgress .playerBuffered) {
    width: 10%;
    background: red;
    transition: none;
  }
}
.playerVoice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 0 0 40px;
  width: 15%;
  > .voiceImg {
    font: 12px;
  }
}
.voiceProgress:extend(.playerProgress) {
  width: 80%;
  .Playeringvoice {
    &:extend(.playerProgress .playerCurrent);
  }
}
.playerOther {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  .playerListButton {
    padding: 5px;
    font-size: 20px;
    cursor: pointer;
  }
}
.hasPlayerList-enter-active,
.hasPlayerList-leave-active {
  transition: all 0.4s;
}
.hasPlayerList-enter,
.hasPlayerList-leave-to {
  transform: translate(50%, 50%) scale(0);
  opacity: 0;
}
.progressButton {
  position: absolute;
  width: 10px;
  height: 10px;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 0.5px solid #000;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px 0 #888;
  }
  &::after:extend(.progressButton) {
    content: "";
    width: 4px;
    height: 4px;
    background: red;
    transform: translate(50%, -50%);
    border: none;
  }
}
.progressBufferingButton:extend(.progressButton) {
  @keyframes loading {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
  span {
    position: absolute;
    width: 2px;
    height: 4px;
    background: #666;
    animation: loading 1.04s infinite;
  }
  .span-for(@n, @i:1) when(@i <= @n) {
    span:nth-of-type(@{i}) {
      transform-origin: center 140%;
      transform: translate(180%, 0) rotate(((@i)-1) * 45deg);
      animation-delay: ((@i)-1) * 0.13s;
    }
    .span-for(@n, (@i+1));
  }
  .span-for(8);
}
</style>
