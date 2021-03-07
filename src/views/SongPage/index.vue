<template>
  <transition name="song" mode="out-in" :appear="true">
    <div class="song-page">
      <div class="song-data" v-if="playingSong.id">
        <div
          class="song-background"
          :style="{ backgroundImage: `url(${playingSong.picUrl})` }"
        ></div>
        <img :src="playingSong.picUrl" alt="" class="song-img" />
        <div class="song-words">
          <div class="song-name">{{ playingSong.name }}</div>
          <div class="song-artists"><span>歌手:</span>{{ playingSong.artists }}</div>
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
    </div>
  </transition>
</template>

<script>
import { scrollAnimation } from '@/libs/tool';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'SongPage',
  data() {
    return {
      lyricIndex: 0,
    };
  },
  computed: {
    ...mapGetters(['playingSong']),
    ...mapState({
      musicDom: (state) => state.playSong.musicDom,
      lyric(state) {
        if (this.playingSong.id && state.playSong.playList[this.playingSong.index].lyric) {
          const timeArr = state.playSong.playList[this.playingSong.index].lyric.match(
            /\[.{8,9}\]/g,
          );
          const lyric = state.playSong.playList[this.playingSong.index].lyric.split(
            /[ \n]?\[.{8,9}\] ?/g,
          );
          lyric.splice(0, 1);
          const lyricAndTime = timeArr.map((item, index) => ({
            time: this.timeProcess(item),
            lyric: lyric[index],
          }));
          return lyricAndTime;
        }
        return '';
      },
    }),
  },
  watch: {
    playingSong(val) {
      if (!val.id) {
        this.$router.replace('/netease');
      }
    },
  },
  methods: {
    timeProcess(timeStreing) {
      timeStreing = timeStreing.slice(1, -1);
      const timeArr = timeStreing.split(/[:.]/g);
      const time = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]) + parseInt(timeArr[2]) * 0.001;
      return time;
    },
  },
  mounted() {
    this.musicDom.addEventListener('timeupdate', (e) => {
      if (this.lyric.length > 0) {
        const index = this.lyric.findIndex((item, i) => {
          if (i + 1 >= this.lyric.length) {
            return false;
          }
          return (
            e.target.currentTime > item.time && e.target.currentTime < this.lyric[i + 1].time
          );
        });
        if (index === -1) {
          this.lyricIndex = this.lyric.length - 1;
        } else if (this.lyricIndex !== index) {
          this.lyricIndex = index;
          if (index - 4 > 0) {
            scrollAnimation(35 * (index - 4), this.$refs.songIyric, 0.2);
          } else {
            scrollAnimation(0, this.$refs.songIyric, 0.2);
          }
        }
      }
    });
  },
};
</script>

<style scoped lang="less">
.song-enter-active,
.song-leave-active {
  transition: all 0.4s;
  position: absolute;
}
.song-enter,
.song-leave-active {
  opacity: 0;
  transform: translate(-20%, 50%) scale(0);
}
.song-page {
  width: 100%;
  height: 78vh;
  position: relative;
  overflow: hidden;
}
.song-background {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(40px) grayscale(50%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transform: scale(1.2);
}
.song-data {
  padding: 0 150px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .song-img {
    width: 300px;
    height: 300px;
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
</style>
