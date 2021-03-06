<template>
  <transition name="song" :appear="true" @before-leave="setLeavePadding">
    <div class="song-page">
      <div class="song-data" v-if="playingSong.id">
        <div
          class="song-background"
          :style="{ backgroundImage: `url(${playingSong.picUrl})` }"
        ></div>
        <div class="song-picture">
          <img :src="playingSong.picUrl" alt="" class="song-img" />
          <div class="song-button">
            <button @click.stop="collectSong">
              <i class="iconfont">{{
                bookmark.isCollected ? "&#xe61c;" : "&#xe604;"
              }}</i>
              收藏
            </button>
            <button @click.stop="download">
              <i class="iconfont">&#xe64a;</i> 下载
            </button>
          </div>
        </div>
        <div class="song-words">
          <div class="song-name">{{ playingSong.name }}</div>
          <div class="song-artists">
            <span>歌手:</span>{{ playingSong.artists }}
          </div>
          <div class="song-lyric" ref="songIyric">
            <div
              v-for="(item, index) in lyric"
              :key="index"
              :class="{ isplaying: lyricIndex === index }"
            >
              {{ item.lyric }}
            </div>
          </div>
        </div>
      </div>
      <div class="no-song" v-else>你还没有播放歌曲哦!</div>
      <CollectPage v-model="isShowCollect" title="收藏到歌单">
        <div
          class="song-list-item"
          v-for="item in bookmark.bookmarkList"
          :key="item.name"
          @click="collectSongItem(item.name)"
        >
          <div class="song-list-item-name">{{ item.name }}</div>
          <div class="song-list-item-num">{{ item.num }}首音乐</div>
        </div>
      </CollectPage>
    </div>
  </transition>
</template>

<script>
import { scrollAnimation } from "@/libs/tool";
import { mapGetters, mapState } from "vuex";
import CollectPage from "@/components/Modal";
import axios from "@/api/http";
export default {
  name: "SongPage",
  data() {
    return {
      lyricIndex: 0,
      isShowCollect: false
    };
  },
  components: {
    CollectPage
  },
  computed: {
    ...mapGetters(["playingSong"]),
    ...mapState({
      musicDom: state => state.playSong.musicDom,
      lyric(state) {
        if (
          this.playingSong.id &&
          state.playSong.playList[this.playingSong.index].lyric
        ) {
          const timeArr = state.playSong.playList[
            this.playingSong.index
          ].lyric.match(/\[.{8,9}\]/g);
          const lyric = state.playSong.playList[
            this.playingSong.index
          ].lyric.split(/[ \n]?\[.{8,9}\] ?/g);
          lyric.splice(0, 1);
          const lyricAndTime = timeArr.map((item, index) => ({
            time: this.timeProcess(item),
            lyric: lyric[index]
          }));
          return lyricAndTime;
        }
        return "";
      },
      playUrl(state) {
        return state.playSong.playList[this.playingSong.index].playUrl;
      },
      bookmark(state) {
        let isCollected = false;
        let bookmarkList = [];
        for (let i in state.bookmark.bookmarkList) {
          for (let j = 0; j < state.bookmark.bookmarkList[i].length; j++) {
            if (state.bookmark.bookmarkList[i][j].id === this.playingSong.id) {
              isCollected = true;
            }
            if (isCollected) {
              break;
            }
          }
          bookmarkList.push({
            name: i,
            num: state.bookmark.bookmarkList[i].length
          });
        }
        return { isCollected, bookmarkList };
      }
    })
  },
  watch: {
    playingSong(val) {
      if (!val.id) {
        this.$router.replace("/netease");
      }
    }
  },
  methods: {
    timeProcess(timeStreing) {
      timeStreing = timeStreing.slice(1, -1);
      const timeArr = timeStreing.split(/[:.]/g);
      const time =
        parseInt(timeArr[0]) * 60 +
        parseInt(timeArr[1]) +
        parseInt(timeArr[2]) * 0.001;
      return time;
    },
    download() {
      this.$toast({ text: "正在创建下载,请稍后", type: "info" });
      axios
        .get(
          this.playUrl.replace("http://isure.stream.qqmusic.qq.com", "/iQQ"),
          {
            responseType: "blob"
          }
        )
        .then(res => {
          let suffix = /\.mp3/.test(this.playUrl) ? ".mp3" : ".m4a";
          let a = document.createElement("a");
          let url = window.URL.createObjectURL(res);
          a.href = url;
          a.download = this.playingSong.name + suffix;
          a.click();
          window.URL.revokeObjectURL(url);
        });
    },
    lyricScrollEvent(e) {
      if (this.lyric.length > 0) {
        const index = this.lyric.findIndex((item, i) => {
          if (i + 1 >= this.lyric.length) {
            return false;
          }
          return (
            e.target.currentTime > item.time &&
            e.target.currentTime < this.lyric[i + 1].time
          );
        });
        if (index === -1) {
          this.lyricIndex = this.lyric.length - 1;
        } else if (this.lyricIndex !== index) {
          this.lyricIndex = index;
          let lyricDOM = this.$refs.songIyric.children[index];
          if (lyricDOM.offsetTop > 150) {
            scrollAnimation(
              lyricDOM.offsetTop - 150,
              this.$refs.songIyric,
              0.2
            );
          } else {
            scrollAnimation(0, this.$refs.songIyric, 0.2);
          }
        }
      }
    },
    collectSong() {
      if (this.bookmark.isCollected) {
        this.$store.commit("removeSong", { songId: this.playingSong.id });
      } else {
        this.isShowCollect = true;
      }
    },
    collectSongItem(name) {
      let playingSong = { ...this.playingSong };
      delete playingSong.index;
      playingSong.isPlaying = false;
      this.$store.commit("addSong", {
        song: playingSong,
        bookmark: name
      });
      this.isShowCollect = false;
    },
    setLeavePadding(dom) {
      if (document.querySelector(".sidebar").clientWidth !== 0) {
        // dom.style.left = "200px";
        // dom.style.paddingLeft = "200px";
        dom.classList.add("song-left");
      }
    }
  },
  mounted() {
    this.musicDom.addEventListener("timeupdate", this.lyricScrollEvent);
  },
  beforeDestroy() {
    this.musicDom.removeEventListener("timeupdate", this.lyricScrollEvent);
  }
};
</script>

<style scoped lang="less">
.song-left {
  left: 200px !important;
  width: calc(100% - 200px) !important;
}
.song-enter-active,
.song-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}
.song-leave-active {
  position: absolute !important;
  top: 40px;
  right: 0;
}
.song-enter,
.song-leave-to {
  opacity: 0;
  transform: translate(-30%, 50%) scale(0);
}
.song-page {
  width: 100%;
  height: calc(100% - 50px);
  position: relative;
  overflow: hidden;
}
.song-background {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(40px) grayscale(50%);
  background-color: rgb(197, 196, 198);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transform: scale(1.2);
}
.song-data {
  padding: 0 150px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .song-img {
    width: 300px;
    height: 300px;
  }
  .song-button {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    > button {
      padding: 5px 10px;
      font-size: 12px;
      border-radius: 5px;
      border: none;
      opacity: 0.9;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
      > * {
        vertical-align: middle;
      }
      &:focus {
        outline: none;
      }
    }
  }
  .song-name {
    margin-bottom: 20px;
    font-size: 20px;
    color: #fff;
  }
  .song-artists {
    margin-bottom: 20px;
    font-size: 15px;
    color: #fff;
    span {
      margin-right: 5px;
      color: #eee;
    }
  }
  .song-lyric {
    position: relative;
    width: 450px;
    height: 300px;
    overflow: auto;
    color: #fff;
  }
}
.song-lyric {
  > div {
    margin: 15px 0;
    min-height: 20px;
    font-size: 15px;
    text-align: center;
    transition: all 0.2s;
  }
}
.isplaying {
  color: red;
}
.no-song {
  font-size: 28px;
  text-align: center;
  line-height: 450px;
}
.song-list-item {
  padding: 5px 16px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  transition: background 0.2s;
  cursor: pointer;
  &:hover {
    background: #ebeced;
  }
  &-name,
  &-num {
    font-size: 14px;
  }
  &-name {
    font-weight: bold;
  }
}
</style>
