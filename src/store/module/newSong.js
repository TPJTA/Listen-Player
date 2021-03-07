//newSong的缓存
import netease from "@/api/netease";
import { getSongArtists } from "@/libs/tool";
let newSong = {
  state: {
    netease: [],
    qq: []
  },
  mutations: {
    setNetease(state, data) {
      state.netease = data;
    },
    setQQ(state, data) {
      state.qq = data;
    }
  },
  actions: {
    getNeteaseSong(state) {
      netease.getNewSong()
        .then((suc) => {
          let songData = suc.result.map((item) => ({
            name: item.name,
            picUrl: item.picUrl,
            id: item.id,
            artists: getSongArtists(item.song.artists),
            source: "netease"
          }));
          state.commit("setNetease", songData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
export default newSong;
