// 当前正在播放的音乐及其歌曲列表
/**
 * interface Song {
 *  name: string;
 *  id: string | number;
 *  artists: string;
 *  source: string;
 *  picUrl?: string;
 * }
 * interface PlayListItem extends Song {
 *  playUrl?: string;
 *  lyric?: string;
 *  isPlaying: bool;
 * }
 *
 * playList: PlayListItem[]
 */
const playSong = {
  state: {
    playList: [],
    musicDom: {}
  },
  getters: {
    playingSong(state) {
      const index = state.playList.findIndex(item => item.isPlaying);
      if (index === -1) {
        return {
          name: "",
          id: "",
          artists: "",
          picUrl: "",
          imgSrc: "",
          lyric: "",
          playUrl: "",
          isPlaying: false,
          source: ""
        };
      } else {
        return {
          ...state.playList[index],
          index
        };
      }
    }
  },

  mutations: {
    /**
     * @function 设置当前播放歌曲
     * @param {Song | index} val 关于歌曲的信息或者在playList的索引
     * @param {Number} val 关于歌曲在playList的索引值
     */
    setPlayingSong(state, val) {
      if (/\d/.test(val)) {
        if (this.getters.playingSong.id) {
          state.playList[this.getters.playingSong.index].isPlaying = false;
        }
        state.playList[val].isPlaying = true;
      } else if (val.name && val.id && val.artists && val.source) {
        if (this.getters.playingSong.index) {
          state.playList[this.getters.playingSong.index].isPlaying = false;
        }
        const findSongIndex = state.playList.findIndex(
          item => item.id === val.id
        );
        if (findSongIndex !== -1) {
          if (this.getters.playingSong.id) {
            state.playList[this.getters.playingSong.index].isPlaying = false;
          }
          state.playList[findSongIndex].isPlaying = true;
        } else {
          this.commit("addPlayListItem", { ...val, isPlaying: true });
        }
      }
    },
    /**
     * @function 设置当前播放歌曲的歌曲
     * @param {String} lyric 歌词
     */
    setPlayinglyric(state, lyric) {
      if (lyric && this.getters.playingSong) {
        state.playList[this.getters.playingSong.index].lyric = lyric;
      }
    },
    /**
     * @function 设置当前播放歌曲的播放url
     * @param {String} url 播放地址
     */
    setPlayUrl(state, url) {
      if (url && this.getters.playingSong) {
        state.playList[this.getters.playingSong.index].playUrl = url;
      }
    },
    /**
     * @function 向播放列表添加歌曲
     * @param { {isPlaying?: Boolean} extends Song }  val 歌曲的相关信息
     */
    addPlayListItem(state, val) {
      if (val.name && val.id && val.artists && val.source) {
        if (!state.playList.find(item => item.id === val.id)) {
          if (val.isPlaying) {
            if (this.getters.playingSong.id) {
              state.playList[this.getters.playingSong.index].isPlaying = false;
            }
            val.isPlaying = true;
          } else {
            val.isPlaying = false;
          }
          state.playList.push(val);
        }
      }
    },
    /**
     * @function 移除PlayList的歌曲
     * @param { {type:"index" || "id", val:Number} } data 歌曲相关信息,可选歌曲在playList的索引值或歌曲id
     */
    removePlayListItem(state, data) {
      if (data.type === "index") {
        state.playList.splice(data.val, 1);
      } else if (data.type === "id") {
        data.val = String(data.val);
        const findIndex = state.playList.find(item => item.id === data.val);
        if (findIndex !== -1) {
          state.playList.splice(findIndex, 1);
        }
      }
    },
    /**
     * @function 改变播放列表
     * @param {Array<song>} data 要改变的播放列表
     */
    changePlayList(state, data) {
      if (Array.isArray(data)) {
        let songList = [...data];
        songList[0].isPlaying = true;
        state.playList = songList;
      }
    },
    /**
     * @function 播放下一首歌
     */
    playNextSong(state) {
      if (this.getters.playingSong.id) {
        if (state.playList.length > 1) {
          const playingIndex = this.getters.playingSong.index;
          if (playingIndex < state.playList.length - 1) {
            state.playList[playingIndex].isPlaying = false;
            state.playList[playingIndex + 1].isPlaying = true;
          } else {
            state.playList[playingIndex].isPlaying = false;
            state.playList[0].isPlaying = true;
          }
        }
      }
    },
    /**
     * @function 播放上一首歌
     */
    playPreviousSong(state) {
      if (this.getters.playingSong.id) {
        if (state.playList.length > 1) {
          const playingIndex = this.getters.playingSong.index;
          if (playingIndex !== 0) {
            state.playList[playingIndex].isPlaying = false;
            state.playList[playingIndex - 1].isPlaying = true;
          } else {
            state.playList[playingIndex].isPlaying = false;
            state.playList[state.playList.length - 1].isPlaying = true;
          }
        }
      }
    },
    /**
     * @function 提交audio的dom对象
     */
    setMusicDom(state, dom) {
      if (dom) {
        state.musicDom = dom;
      }
    }
  }
};
export default playSong;
