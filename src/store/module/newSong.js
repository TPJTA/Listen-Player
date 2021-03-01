//newSong的缓存
import { getNewSong } from "@/api/netease";
import { getSongArtists } from "@/libs/tool";
let newSong = {
  state: {
    songData: [],
  },
  mutations: {
    setSongData(state, data) {
      state.songData = data;
    },
  },
  actions: {
    getSong(state) {
      getNewSong()
        .then((suc) => {
          let songData = suc.result.map((item) => ({
            name: item.name,
            picUrl: item.picUrl,
            id: item.id,
            artists: getSongArtists(item.song.artists),
          }));
          state.commit("setSongData", songData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
export default newSong;
