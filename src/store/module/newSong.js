//newSong的缓存
import netease from "@/api/netease";
import qq from "@/api/qq"
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
    getQQSong(state) {
      qq.getHotSong().then(res => {
        let songData = res.req_1.data.songlist.map(item => ({
          name: item.title,
          picUrl: `//y.qq.com/music/photo_new/T002R300x300M000${item.album.mid}_1.jpg?max_age=2592000`,
          id: item.mid,
          artists: getSongArtists(item.singer),
          source: "qq"
        }))
        // let songData = res.hotkey.data.track_info.map((item,index) => ({
        //   name: item.name,
        //   picUrl: res.hotkey.data.vec_hotkey[index].cover_pic_url,
        //   id: item.file.media_mid,
        //   artists: getSongArtists(item.singer),
        //   source: "qq"
        // }));
        state.commit("setQQ",songData);
      }).catch(err => {
        console.log(err);
      })
    }
  },
};
export default newSong;
