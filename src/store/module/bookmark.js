/**
 * interface song {
 *  name: string,
 *  id: string | number,
 *  picUrl?: string,
 *  lyric?: string
 *  playUrl?: string
 *  source: "qq" | "netease"
 * }
 * interface bookmarkList {
 *  [name: string]: Array<song>
 * }
 */
import vue from "@/main";
let bookmark = {
  state: {
    bookmarkList: {
      默认歌单: []
    }
  },
  mutations: {
    addBookmark(state, bookmark) {
      if (!Array.isArray(state.bookmarkList[bookmark])) {
        state.bookmarkList = { ...state.bookmarkList, [bookmark]: [] };
      } else {
        vue.$toast({ text: "该名称无法添加", type: "danger" });
      }
    },
    removeBookmark(state, bookmark) {
      if (bookmark !== "默认歌单" && state.bookmarkList[bookmark]) {
        let bookmarkList = { ...state.bookmarkList };
        delete bookmarkList[bookmark];
        state.bookmarkList = bookmarkList;
      }
    },
    addSong(state, data) {
      let { song, bookmark } = data;
      if (Array.isArray(state.bookmarkList[bookmark])) {
        state.bookmarkList[bookmark].push(song);
      } else {
        state.bookmarkList[bookmark] = [song];
      }
    },
    removeSong(state, data) {
      let { songId, bookmark } = data;
      if (bookmark) {
        if (Array.isArray(state.bookmarkList[bookmark])) {
          let index = state.bookmarkList[bookmark].findIndex(item => {
            return item.id === songId;
          });
          if (index !== -1) {
            state.bookmarkList[bookmark].splice(index, 1);
          }
        }
      } else {
        for (let i in state.bookmarkList) {
          let index = state.bookmarkList[i].findIndex(
            item => item.id === songId
          );
          if (index !== -1) {
            state.bookmarkList[i].splice(index, 1);
            break;
          }
        }
      }
    }
  }
};
export default bookmark;
