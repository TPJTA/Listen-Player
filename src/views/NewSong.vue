<template>
  <div>
      <div class="title">最新歌曲</div>
      <ul class="song-list">
          <li class="song-list-item" v-for="item in songData" :key="item.id" :data-id="item.id">
            <div class="song-img">
              <img :src="item.picUrl" alt="">
            </div>
            <div class="song-words">
              <p>{{item.name}}</p>
              <p>{{getSongArtists(item.song.artists)}}</p>
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
    }
  },
  mounted() {
    if(this.type === "netease") {
      getNewSong().then(suc => {
        this.songData = suc.data.result
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.song-list {
  display: flex;
  flex-wrap: wrap;
}
.song-list-item {
  width: 20%;
}
.song-img > img {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 100px;
}
.song-words > p {
  font-size: 18px;
  text-align: center;
}
.song-words > p:last-of-type {
  color: #999;
}
</style>>
