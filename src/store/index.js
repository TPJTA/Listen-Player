import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playList: [
      {
        name: "aaa",
        id: "1476206740",
        artists: "bbb",
        imgSrc:"",
        lyric:"",
        isPlaying:true
      },
      {
        name: "ccc",
        id: "11",
        artists: "ddd",
        imgSrc:"",
        lyric:"",
        isPlaying:false
      },
      {
        name: "ccc",
        id: "22",
        artists: "ddd",
        imgSrc:"",
        lyric:"",
        isPlaying:false
      }
    ]
  },
  getters: {
    playingSong(state) {
      let index = state.playList.findIndex(item => item.isPlaying)
      if(index === -1) {
        return {
          name: "",
          id: "",
          artists: "",
          imgSrc:"",
          lyric:"",
          isPlaying:false
        }
      }else {
        return {
          ...state.playList[index],
          index
        }
      }
    }
  },
  
  mutations: {
    /**
     * @function 设置当前播放歌曲
     * @param {Object: {name:String, id:String, artists:String, [imgSrc:String]} } val 关于歌曲的信息
     */
    setPlayingSong(state, val) {
      if(val.name && val.id && val.artists) {
        if(this.getters.playingSong.index) {
          state.playList[this.getters.playingSong.index].isPlaying = false
        }
        let findSongIndex = state.playList.find(item => item.id === val.id)
        if(findSongIndex) {
          state.playingSong[findSongIndex].imgSrc = val.imgSrc
          state.playingSong[findSongIndex].isPlaying = true
        }else {
          this.addPlayListItem(val, true)
        }
      }
    },
    /**
     * @function 设置当前播放歌曲的歌曲
     * @param {String} lyric 歌词
     */
    setPlayinglyric(state, lyric) {
      if(lyric && this.getters.playingSong) {
        state.playList[this.getters.playingSong.index].lyric =lyric
      }
    },
    /**
     * @function 向播放列表添加歌曲
     * @param {Object: {name:String, id:String, artists:String, [imgSrc:String]} } val 歌曲的相关信息
     * @param {Boolean} isPlaying 是否播放
     */
    addPlayListItem(state, val, isPlaying) {
      if(val.name && val.id && val.artists) {
        if(!state.playList.find(item => item.id === val.id)) {
          if(isPlaying) {
            if(this.getters.playingSong) {
              state.playList[this.getters.playingSong.index].isPlaying = false
            }
            val.isPlaying = true
          }else {
            val.isPlaying = false
          }
          state.playList.push(val)
        }
      }
    },
    /**
     * @function 
     * @param {Object: {type:"index" || "id",val:Number}} data 歌曲相关信息,可选歌曲在playList的索引值或歌曲id
     */
    removePlayListItem(state, data) {
      if(data.type === "index") {
        state.playList.splice(data.val, 1)
      }else if(data.type === "id") {
        data.val = String(data.val)
        let findIndex = state.playList.find(item => item.id === data.val) 
        if(findIndex !== -1) {
          state.playList.splice(findIndex,1)
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
