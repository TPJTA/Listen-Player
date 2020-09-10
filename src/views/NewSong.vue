<template>
  <div class="new-song">
      <div class="title">最新歌曲</div>
      <ul class="song-list">
          <li class="song-list-item" v-for="(item,index) in songData" :key="item.id" @click="playSong(index,$event)">
            <div class="song-img iconfont">
              <img :src="item.picUrl" alt="">
            </div>
            <div class="song-words">
              <p>{{item.name}}</p>
              <p>{{item.artists}}</p>
            </div>
          </li>
      </ul>
  </div>
</template>

<script>
import {getNewSong} from "@/server/netease"

export default {
  name: "NewSong",
  props: {type: String},

  data: function() {
    return {
        songData:[]
    }
  },
  methods: {
    getSongArtists(artistsArr) {
      let nameArr = artistsArr.map(item => item.name)
      return nameArr.join("/")
    },
    playSong(index) {
      this.$store.commit("setPlayingSong",this.songData[index])
    }
  },
  mounted() {
    if(this.type === "netease") {
      getNewSong().then(suc => {
        this.songData = suc.data.result.map(item => ({
          name: item.name,
          picUrl: item.picUrl,
          id: item.id,
          artists: this.getSongArtists(item.song.artists)
        }))
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
.new-song {
  padding: 0 20px;
}
.title {
  margin: 10px 0 20px;
  font-size: 20px;
  color: #666;
  &::after {
    margin: 5px  0;
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
  margin-bottom: 30px;
  box-sizing: border-box;
  padding: 0 50px;
  width: 20%;
  min-width: 200px;
  cursor: pointer;
  &:hover {
    .song-img::before {
      opacity: 1;
    }
  }
}
.song-img {
  position: relative;
  &::before {
    content: "\e60f";
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
    opacity: 0;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    color: red;
    transition: opacity .5s;
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
</style>>
