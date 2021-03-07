<template>
  <div class="playerList">
    <div class="playerListHeader">
      <div class="playerListTitle">播放列表</div>
      <div class="playerListCancel iconfont" @click="setPlayerList">&#xe601;</div>
    </div>
    <div class="playerListSongOutter">
      <transition-group name="playList" tag="ul" class="playerListSong" v-if="playList">
        <li
          class="playerListSongItem"
          v-for="(item, index) in playList"
          :key="item.id"
          @dblclick="playingSong(index)"
        >
          <div class="playeringMark iconfont" v-if="item.isPlaying">&#xe60f;</div>
          <div class="noPlayeringMark iconfont" v-else>&#xe60f;</div>
          <div class="playerListSongName" :title="item.name">{{ item.name }}</div>
          <div class="playerListSongaArtists" :title="item.artists">{{ item.artists }}</div>
          <div
            class="playerListSongDelete iconfont"
            @click="removePlayListItem({ type: 'index', val: index })"
          >
            &#xe601;
          </div>
        </li>
      </transition-group>
      <div class="noneSong" v-else>你还没有添加任何歌曲!</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'PlayerList',
  props: { setPlayerList: Function },
  computed: {
    ...mapState({
      playList: (state) => {
        if (state.playSong.playList.length === 0) {
          return undefined;
        }
        return state.playSong.playList;
      },
    }),
  },
  methods: {
    playingSong(index) {
      this.$store.commit('setPlayingSong', index);
    },
    ...mapMutations(['removePlayListItem']),
  },
};
</script>

<style scoped lang="less">
.playerList {
  position: absolute;
  bottom: 52px;
  right: 0;
  width: 350px;
  height: 400px;
  background: rgb(250, 250, 250);
  box-shadow: 0 0 5px 0 #666;
}
.playerListHeader {
  position: relative;
  width: 100%;
  height: 30px;
  background: rgb(244, 244, 246);
  .playerListTitle {
    font-size: 15px;
    text-align: center;
    line-height: 30px;
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
  height: 370px;
  overflow: auto;
}
.noneSong {
  width: 100%;
  font-size: 18px;
  color: #aaa;
  line-height: 370px;
  text-align: center;
  user-select: none;
}
.playerListSong {
  display: table;
  width: 100%;
  table-layout: fixed;
  box-sizing: border-box;
  > .playerListSongItem {
    display: table-row;
    position: relative;
    height: 35px;
    width: 100%;
    user-select: none;
    transition: all 0.5s linear;
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
      display: table-cell;
      width: 150px;
      font-size: 15px;
      line-height: 35px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .playerListSongaArtists {
      display: table-cell;
      width: 130px;
      font-size: 15px;
      color: #888;
      line-height: 35px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .playeringMark {
      margin: 0 10px 0 10px;
      font-size: 12px;
      color: red;
      vertical-align: middle;
      line-height: 35px;
    }
    .noPlayeringMark {
      margin: 0 10px 0 10px;
      font-size: 12px;
      color: #aaa;
      opacity: 0;
      transition: opacity 0.3s;
      cursor: pointer;
      line-height: 35px;
    }
    .playerListSongDelete {
      opacity: 0;
      margin: 0 30px 0 0;
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
  position: absolute !important;
  .noPlayeringMark,
  .playerListSongDelete,
  .playeringMark {
    display: none;
  }
}
</style>
