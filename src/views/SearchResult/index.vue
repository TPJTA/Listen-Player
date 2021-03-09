<template>
  <div class="search">
    <div class="search-data">
      正在搜索"<span>{{ name }}</span
      >"
    </div>
    <div v-if="isLoading" class="search-load">
      <div class="search-load-animation">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      加载中~~~
    </div>
    <div class="search-result" v-else>
      <div class="search-result-table">
        <div class="search-result-header">
          <div class="search-result-row">
            <div class="search-result-cell"></div>
            <div class="search-result-cell">操作</div>
            <div class="search-result-cell">音乐名</div>
            <div class="search-result-cell">歌手</div>
            <div class="search-result-cell">专辑</div>
            <div class="search-result-cell">时长</div>
          </div>
        </div>
        <div class="search-result-body">
          <div
            class="search-result-row"
            v-for="(item, index) in result"
            :key="index"
          >
            <div class="search-result-cell">
              {{ numberTansform(index + 1) }}
            </div>
            <div class="search-result-cell">
              <i @click="addSong(index)" class="iconfont">&#xe603;</i>
              <i @click="playSong(index)" class="iconfont">&#xe60f;</i>
            </div>
            <div class="search-result-cell">
              <span :title="item.name">{{ item.name }}</span>
            </div>
            <div class="search-result-cell">
              <span :title="item.artists">{{ item.artists }}</span>
            </div>
            <div class="search-result-cell">
              <span :title="item.al">{{ item.al }}</span>
            </div>
            <div class="search-result-cell">{{ item.publishTime }}</div>
          </div>
        </div>
      </div>
      <div class="search-result-last" v-if="isLast">没有更多了~~</div>
    </div>
  </div>
</template>

<script>
import netease from "@/api/netease";
import qq from "@/api/qq";
import { getSongArtists, secondsToMinutes } from "@/libs/tool";

export default {
  name: "search",
  props: { name: String, source: String },
  data() {
    return {
      isLast: false,
      isLoading: true,
      result: [],
      page: 1
    };
  },
  methods: {
    numberTansform(index) {
      if (index < 10) {
        return `0${index}`;
      }
      return String(index);
    },
    addSong(index) {
      this.$store.commit("addPlayListItem", {
        ...this.result[index],
        isPlaying: false
      });
    },
    playSong(index) {
      this.$store.commit("setPlayingSong", {
        ...this.result[index]
      });
    },
    getSongResult(name, page) {
      if (this.source === "netease") {
        netease
          .getSearchResult(name, page)
          .then(suc => {
            if (suc.result.songs && suc.result.songs.length < 20) {
              this.isLast = true;
            }
            const result = suc.result.songs.map(item => ({
              name: item.name,
              id: item.id,
              artists: getSongArtists(item.ar),
              al: item.al.name,
              publishTime: secondsToMinutes(item.dt / 1000).join(":"),
              picUrl: item.al.picUrl,
              source: "netease"
            }));
            this.result = [...this.result, ...result];
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.source === "qq") {
        qq.getSearchResult(name, page)
          .then(res => {
            if (res.data.song.list && res.data.song.list.length < 20) {
              this.isLast = true;
            }
            console.log(res.data.song.list);
            const result = res.data.song.list.map(item => {
              return {
                name: item.songname,
                id: item.songmid,
                artists: getSongArtists(item.singer),
                al: item.albumname,
                picUrl: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
                publishTime: secondsToMinutes(item.pubtime / 1000).join(":"),
                source: "qq"
              };
            });
            this.result = [...this.result, ...result];
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getNextPage() {
      if (
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop <=
        document.documentElement.clientHeight
      ) {
        this.page += 1;
        this.getSongResult(this.name, this.page);
      }
    }
  },
  mounted() {
    this.getSongResult(this.name, this.page);
    window.addEventListener("scroll", this.getNextPage);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.getNextPage);
  },
  watch: {
    $route() {
      this.result = [];
      this.page = 1;
      this.isLoading = true;
      this.getSongResult(this.name, this.page);
    }
  }
};
</script>

<style scoped lang="less">
@keyframes loading {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
.search-data {
  margin: 20px 0 20px 40px;
  font-size: 18px;
  span {
    color: red;
  }
}
.search-load {
  text-align: center;
  font-size: 16px;
  color: #666;
  &-animation {
    position: relative;
    width: 80px;
    height: 40px;
    display: inline-block;
    vertical-align: middle;
    .span-for(@n, @i:1)when(@i <= @n) {
      span:nth-of-type(@{i}) {
        position: absolute;
        bottom: 0;
        right: 50%;
        display: block;
        height: 10px;
        width: 3px;
        background: #666;
        transform: rotate(45deg * ((@i)-1));
        transform-origin: center -80%;
        animation: loading 0.7s ease infinite 0.1s * ((@i)-1);
      }
      .span-for(@n, @i+1);
    }
    .span-for(8);
  }
}
.search-result {
  width: 100%;
  &-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    box-sizing: border-box;
    table-layout: fixed;
  }
  &-last {
    text-align: center;
    font-size: 16px;
    color: #666;
  }
  &-header {
    display: table-header-group;
    .search-result-cell {
      border: 1px solid rgba(0, 0, 0, 0.1);
      &:first-child {
        border-left: none;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
  &-body {
    display: table-row-group;

    .search-result-cell:nth-child(1),
    .search-result-cell:nth-child(2) {
      color: #aaa;
    }
  }
  &-row {
    transition: background 0.5s linear;
    &:nth-of-type(even) {
      background: rgb(245, 245, 245);
    }
    &:hover {
      background: rgb(235, 236, 237);
    }
    display: table-row;
  }
  &-cell {
    display: table-cell;
    box-sizing: border-box;
    padding-left: 15px;
    height: 40px;
    font-size: 14px;
    color: #333;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:nth-child(1) {
      padding-right: 30px;
      width: 8%;
      text-align: right;
    }
    &:nth-child(2) {
      width: 12%;
    }
    &:nth-child(3) {
      width: 33%;
    }
    &:nth-child(4) {
      width: 17%;
    }
    &:nth-child(5) {
      width: 20%;
    }
    &:nth-child(6) {
      width: 10%;
    }
    i {
      user-select: none;
      cursor: pointer;
      &:nth-child(1) {
        margin-right: 20px;
      }
    }
  }
}
</style>
