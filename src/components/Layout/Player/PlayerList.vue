<template>
  <div class="playerList">
    <div class="playerListHeader">
      <div class="playerListTitle">播放列表</div>
      <div class="playerListCancel iconfont" @click="setPlayerList">
        &#xe601;
      </div>
    </div>
    <div class="playerListSongOutter">
      <div class="noneSong" v-if="!playList">你还没有添加任何歌曲!</div>
      <transition-group name="playList" tag="ul" class="playerListSong">
        <li
          class="playerListSongItem"
          v-for="(item, index) in playList"
          :key="item.id"
          @dblclick="playingSong(index)"
        >
          <div class="playerListSongItemContent">
            <div class="playeringMark iconfont" v-if="item.isPlaying">
              &#xe60f;
            </div>
            <div
              class="noPlayeringMark iconfont"
              @click="playingSong(index)"
              v-else
            >
              &#xe60f;
            </div>
            <div class="playerListSongName" :title="item.name">
              {{ item.name }}
            </div>
            <div class="playerListSongaArtists" :title="item.artists">
              {{ item.artists }}
            </div>
            <div
              class="playerListSongDelete iconfont"
              @click="removePlayListItem({ type: 'index', val: index })"
            >
              &#xe601;
            </div>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "PlayerList",
  props: { setPlayerList: Function },
  computed: {
    ...mapState({
      playList: state => {
        if (state.playSong.playList.length === 0) {
          return undefined;
        }
        return state.playSong.playList;
      }
    })
  },
  methods: {
    playingSong(index) {
      this.$store.commit("setPlayingSong", index);
    },
    ...mapMutations(["removePlayListItem"])
  }
};
</script>

<style scoped lang="less">
.playerList {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 350px;
  height: 400px;
  background: rgb(250, 250, 250);
  box-shadow: 0 0 5px 0 #666;
}
.playerListHeader {
  position: relative;
  width: 100%;
  height: 40px;
  background: rgb(244, 244, 246);
  .playerListTitle {
    font-size: 15px;
    text-align: center;
    line-height: 40px;
  }
  .playerListCancel {
    position: absolute;
    padding: 5px;
    font-size: 12px;
    top: 50%;
    right: 20px;
    transform: translate(0, -50%);
    cursor: pointer;
  }
}
.playerListSongOutter {
  position: relative;
  height: 360px;
  overflow-x: hidden;
  overflow-y: auto;
}
.noneSong {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 18px;
  color: #aaa;
  line-height: 300px;
  text-align: center;
  user-select: none;
}
.playerListSong {
  width: 100%;
  > .playerListSongItem {
    height: 35px;
    width: 100%;
    user-select: none;
    transition: all 0.3s linear;
    .playerListSongItemContent {
      position: relative;
      padding: 0 15px 0 30px;
      height: 100%;
      width: 100%;
    }
    &:nth-of-type(even) {
      background: rgb(245, 245, 245);
    }
    &:hover {
      background: rgb(235, 236, 237);
      .playerListSongDelete,
      .noPlayeringMark {
        opacity: 1;
      }
    }
    .playerListSongName {
      display: inline-block;
      width: 150px;
      font-size: 15px;
      line-height: 35px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .playerListSongaArtists {
      display: inline-block;
      width: 130px;
      font-size: 15px;
      color: #888;
      line-height: 35px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .playeringMark {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      color: red;
      vertical-align: middle;
      line-height: 35px;
    }
    .noPlayeringMark {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      color: #aaa;
      opacity: 0;
      transition: opacity 0.3s;
      cursor: pointer;
      line-height: 35px;
    }
    .playerListSongDelete {
      position: absolute;
      opacity: 0;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 10px;
      color: #aaa;
      transition: opacity 0.3s;
      cursor: pointer;
      vertical-align: middle;
    }
  }
}
.playList-enter,
.playList-leave-to {
  opacity: 0;
  transform: translateX(350px) scale(0);
}
.playList-leave-active {
  position: absolute;
}
</style>
