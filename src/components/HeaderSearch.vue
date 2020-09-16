<template>
    <div class="search iconfont">
      <input type="text" 
        class="search-box" 
        v-model="keyWord" 
        @keydown.enter="searchSong(keyWord)"
        @blur="setResultShow(false)"
        @focus="setResultShow(true)"
      />
      <i class="iconfont search-icon" @click="searchSong(keyWord)">&#xe602;</i>
      <transition-group tag="ul" class="search-keywords" name="keywords" v-show="isResultShow">
          <li 
            class="search-keywords-item iconfont" 
            v-for="item in result" 
            :key="item.keyword"
            @click="searchSong(item.keyword)"
          >
              {{item.keyword}}
          </li>
      </transition-group>
    </div>
</template>

<script>
import {keyWords} from "@/server/netease.js"
let isNone = false //是否输入框为空，为空则请求结束时直接将result设置为[]

export default {
    name: "HeaderSearch",
    data() {
        return ({
            keyWord:"",
            result:[],
            isResultShow: false
        })
    },
    watch: {
        keyWord: function() {
            if(this.keyWord) {
                isNone = false
                keyWords(this.keyWord).then(suc => {
                    if(isNone) {
                        this.result = []
                    }else {
                        this.result = suc.data.result.allMatch
                    }
                }).catch(err => {
                    console.log(err)
                })
            }else {
                isNone = true
                this.result = []
            }
        }
    },
    methods: {
        searchSong(name) {
            console.log(name)
            this.$router.push(`/search/${name}`)
            this.keyWord = ""
        },
       setResultShow(isShow) {
           setTimeout(() => {
               this.isResultShow = isShow
           },100)
        }
    }
}
</script>

<style scoped lang="less">
.search {
  display: inline-block;
  position: relative;
  &-icon {
    display: block;
    position: absolute;
    padding: 2px 0;
    content: "\e602";
    top: 0;
    right: 7px;
    font-size: 14px;
    cursor: pointer;
    color: #666;
    z-index: 6;
  }
  .search-box {
    position: relative;
    margin-left: 30px;
    padding: 2px 50px 2px 10px;
    height: 20px;
    width: 250px;
    box-sizing: border-box;
    border: none;
    outline: none;
    background: #bbb;
    border-radius: 10px;
    font: 12px;
  }
}
.search-keywords {
  position: absolute;
  left: 35px;
  width: 240px;
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
    transition: all .5s;
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
.keywords-enter, .keywords-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>