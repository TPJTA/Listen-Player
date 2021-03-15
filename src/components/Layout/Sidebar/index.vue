<template>
  <div class="sidebar" :class="{ 'no-sidebar': !isSidebar }">
    <div class="sidebar-contain">
      <div class="sidebar-title">
        我的歌单
        <i class="iconfont sidebar-add" @click.stop="showAdd">&#xe656;</i>
      </div>
      <ul class="sidebar-list">
        <transition-group>
          <li
            class="sidebar-list-item sidebar-list-item-add"
            key="song-add"
            v-if="isAdd"
            @click.stop
          >
            <input
              class="sidebar-list-item-add-input"
              type="text"
              v-model="addName"
            />
            <button class="sidebar-list-item-add-button" @click="addBookmark">
              确定
            </button>
          </li>
          <li
            class="sidebar-list-item"
            @click="showSongList"
            v-for="item in bookmark"
            :key="item.name"
          >
            <div>
              <i class="iconfont">&#xe600;</i>
              <div class="iconfont song-play">&#xe60f;</div>
              <span>{{ item.name }}</span>
            </div>
            <ul class="sidebar-song-list">
              <li
                class="sidebar-song-item"
                v-for="songItem in item.value"
                :key="songItem.id"
              >
                <div class="iconfont song-play">&#xe60f;</div>
                <span>{{ songItem.name }}</span>
              </li>
            </ul>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "sidebar",
  props: {
    isSidebar: Boolean
  },
  data() {
    return {
      isAdd: false,
      addName: ""
    };
  },
  methods: {
    showSongList(event) {
      let listDOM = event.currentTarget;
      let songDOM = listDOM.querySelector(".sidebar-song-list");
      if (songDOM.offsetHeight !== songDOM.scrollHeight) {
        songDOM.style.height = songDOM.scrollHeight + "px";
      } else {
        songDOM.style.height = 0;
      }
    },
    addBookmark() {
      if (this.addName) {
        this.$store.commit("addBookmark", this.addName);
      }
    },
    showAdd() {
      this.isAdd = true;
      document.addEventListener("click", this.hiddenAdd);
    },
    hiddenAdd() {
      this.isAdd = false;
    }
  },
  computed: {
    ...mapState({
      bookmark: state => {
        let result = [];
        for (let i in state.bookmark.bookmarkList) {
          result.push({ name: i, value: state.bookmark.bookmarkList[i] });
        }
        return result;
      }
    })
  },
  watch: {
    bookmark() {
      let list = document.querySelectorAll(".sidebar-song-list");
      for (let i = 0; i < list.length; i++) {
        list[i].style.height = 0;
      }
    },
    isAdd(val) {
      if (!val) {
        this.addName = "";
        document.removeEventListener("click", this.hiddenAdd);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.no-sidebar {
  width: 0px !important;
}
.sidebar {
  position: relative;
  width: 200px;
  height: 100%;
  background: rgb(248, 248, 248);
  border-right: 1px solid rgb(229, 229, 229);
  overflow: hidden;
  transition: width 0.5s;
  &-contain {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
  }
  &-title {
    position: relative;
    padding: 0 15px;
    height: 50px;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    line-height: 50px;
    .sidebar-add {
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
      font-weight: normal;
      cursor: pointer;
    }
  }
}
.sidebar-list {
  padding: 0 15px;
  height: calc(100% - 50px);
  font-size: 14px;
  overflow: auto;
  &-item {
    &-add {
      position: relative;
      height: 32px;
      padding: 5px 0;
      &-input {
        padding-left: 2px;
        height: 100%;
        width: 100px;
        border: 1px solid #dcdee2;
        vertical-align: middle;
        &:focus {
          outline: 0;
          box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
          border-color: #57a3f3;
        }
      }
      &-button {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        padding: 0;
        display: inline-block;
        width: 40px;
        text-align: center;
        vertical-align: middle;
        color: #515a6e;
        border: 1px solid #dcdee2;
        cursor: pointer;
        transition: all 0.4s;
        &:hover {
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
        }
        &:focus {
          outline: 0;
        }
      }
    }
    > div {
      padding: 5px 0;
      position: relative;
      opacity: 0.8;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        opacity: 1;
        > .song-play {
          opacity: 1;
        }
      }
      > i {
        margin-right: 5px;
      }
    }
  }
}
.sidebar-song-list {
  height: 0;
  overflow: hidden;
  transition: height 0.2s;
  > li {
    position: relative;
    padding: 4px 0 4px 21px;
    opacity: 0.8;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      opacity: 1;
      > .song-play {
        opacity: 1;
      }
    }
  }
}
.song-play {
  position: absolute;
  top: 60%;
  right: 5px;
  font-size: 12px;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s;
}
</style>
