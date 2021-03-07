<template>
  <keep-alive name="song" mode="out-in" :appear="true">
    <transition name="song" mode="out-in" :appear="true">
      <div class="new-song">
        <div class="title">最新歌曲</div>
        <ul class="song-list">
          <li
            class="song-list-item"
            v-for="(item, index) in songData"
            :key="item.id"
            @click="playSong(index, $event)"
          >
            <div class="song-img iconfont">
              <img
                :src="item.picUrl"
                alt=""
                @load="setIsLoading(index, false)"
              />
              <div class="song-img-play" v-show="!isShowArr[index]">
                &#xe60f;
              </div>
              <LoadingImg :isShow="isShowArr[index]" />
            </div>
            <div class="song-words">
              <p>{{ item.name }}</p>
              <p>{{ item.artists }}</p>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
import LoadingImg from "@/components/LoadingImg";
export default {
  name: "NewSong",
  props: { type: String },
  components: {
    LoadingImg
  },
  data() {
    return {
      isShowArr: []
    };
  },
  computed: {
    ...mapState({
      songData: function(state) {
        if (this.type === "netease") {
          this.isShowArr = new Array(state.newSong.netease.length).fill(true);
          return state.newSong.netease;
        }
      }
    })
  },
  methods: {
    playSong(index) {
      this.$store.commit("setPlayingSong", this.songData[index]);
    },
    setIsLoading(i, bool) {
      let isShowArr = [...this.isShowArr];
      isShowArr[i] = bool;
      this.isShowArr = isShowArr;
    }
  },
  mounted() {
    if (this.type === "netease")
      if (this.$store.state.newSong.netease.length === 0) {
        this.$store.dispatch("getNeteaseSong");
      }
  }
};
</script>

<style scoped lang="less">
.song {
  &-enter-active,
  &-leave-active {
    transition: transform 0.2s;
  }
  &-enter,
  &-leave-to {
    transform: scale(0);
  }
}
.new-song {
  padding: 0 20px;
}
.title {
  margin: 10px 0 20px;
  font-size: 20px;
  color: #666;
  &::after {
    margin: 5px 0;
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #aaa;
  }
}
.song-list {
  display: flex;
  flex-wrap: wrap;
  min-width: 1000px;
}
.song-list-item {
  position: relative;
  margin-bottom: 30px;
  box-sizing: border-box;
  padding: 0 50px;
  width: 20%;
  min-width: 200px;
  cursor: pointer;
  &:hover {
    .song-img-play {
      opacity: 1;
    }
  }
}
.song-img {
  position: relative;
  width: 100%;
  &-play {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    color: red;
    transition: opacity 0.5s;
  }
}
.song-img > img {
  display: block;
  margin: 0 auto;
  width: 100%;
  min-width: 100px;
}
.song-words {
  text-align: center;
}
.song-words > p {
  display: inline-block;
  font-size: 15px;
  text-align: left;
  &:last-of-type {
    display: block;
    font-size: 12px;
    text-align: center;
    color: #999;
  }
}
</style>
