<template>
  <div class="search iconfont">
    <input
      type="text"
      class="search-box"
      v-model="keyWord"
      @keydown.enter="searchSong(keyWord)"
      @blur="setResultShow(false)"
      @focus="setResultShow(true)"
    />
    <i class="iconfont search-icon" @click="searchSong(keyWord)">&#xe602;</i>
    <transition-group
      tag="ul"
      class="search-keywords"
      name="keywords"
      v-show="isResultShow"
    >
      <li
        class="search-keywords-item iconfont"
        v-for="item in result"
        :key="item.keyword"
        @click="searchSong(item.keyword)"
      >
        {{ item.keyword }}
      </li>
    </transition-group>
  </div>
</template>

<script>
import netease from "@/api/netease";
import qq from "@/api/qq";
let isNone = false; // 是否输入框为空，为空则请求结束时直接将result设置为[]

export default {
  name: "HeaderSearch",
  props: { source: String },
  data() {
    return {
      keyWord: "",
      result: [],
      isResultShow: false
    };
  },
  watch: {
    keyWord() {
      if (this.keyWord) {
        isNone = false;
        if (this.source === "netease") {
          netease
            .keyWords(this.keyWord)
            .then(suc => {
              if (isNone) {
                this.result = [];
              } else {
                this.result = suc.result.allMatch;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.source === "qq") {
          qq.keyWords(this.keyWord)
            .then(res => {
              if (isNone) {
                this.result = [];
              } else {
                this.result = res.data.song.itemlist.map(item => {
                  return {
                    ...item,
                    keyword: item.name
                  };
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        isNone = true;
        this.result = [];
      }
    }
  },
  methods: {
    searchSong(name) {
      this.$router.push({
        path: `/search/${this.source}`,
        query: { name }
      });
      this.keyWord = "";
    },
    setResultShow(isShow) {
      setTimeout(() => {
        this.isResultShow = isShow;
      }, 100);
    }
  }
};
</script>

<style scoped lang="less">
.search {
  display: inline-block;
  position: relative;
  height: 100%;
  flex: 1;
  &-icon {
    display: block;
    position: absolute;
    padding: 2px 0;
    content: "\e602";
    top: 50%;
    left: 300px;
    font-size: 14px;
    cursor: pointer;
    color: #666;
    z-index: 6;
    transform: translateY(-50%);
  }
  .search-box {
    position: relative;
    margin-left: 30px;
    padding: 2px 50px 2px 10px;
    height: 100%;
    width: 300px;
    box-sizing: border-box;
    border: none;
    outline: none;
    background: rgb(229, 229, 229);
    border-radius: 5px;
    font: 12px;
  }
}
.search-keywords {
  position: absolute;
  left: 35px;
  width: 290px;
  max-height: 130px;
  background: #fff;
  box-shadow: 0 0 5px 0 #666;
  overflow: auto;
  z-index: 5;
}
.search-keywords-item {
  display: block;
  position: relative;
  padding: 5px 0 5px 25px;
  font-size: 12px;
  user-select: none;
  transition: all 0.5s;
  &:hover {
    background-color: #ccc;
  }
  &::before {
    position: absolute;
    left: 5px;
    top: 50%;
    content: "\e602";
    transform: translate(0, -50%);
  }
}
.keywords-leave-active {
  position: absolute !important;
}
.keywords-enter,
.keywords-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
