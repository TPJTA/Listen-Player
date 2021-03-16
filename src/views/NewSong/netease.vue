<template>
  <!-- <transition name="song" mode="out-in" :appear="true"> -->
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
          <img :src="item.picUrl" alt="" @load="setIsLoading(index, false)" />
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
  <!-- </transition> -->
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
        this.isShowArr = new Array(state.newSong.netease.length).fill(true);
        return state.newSong.netease;
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
    if (this.$store.state.newSong.netease.length === 0) {
      this.$store.dispatch("getNeteaseSong");
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
