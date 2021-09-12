import axios from "../http";
import qs from "qs";
/**
 * 网络启用了代理，请根据设置的请求头请求不同地址
 *   /cQQ: https://c.y.qq.com
 *   /uQQ: https://u.y.qq.com/cgi-bin/musicu.fcg
 *
 */
const cURL = "/cQQ";
const uURL = "/uQQ";
const comm = {
  g_tk: 5381,
  uin: "",
  format: "json",
  inCharset: "utf-8",
  outCharset: "utf-8",
  notice: 0,
  platform: "h5",
  needNewCode: 1,
};
const hotKey = {
  MusicHallHomePage: {
    module: "music.musicHall.MusicHallPlatform",
    method: "MobileWebHome",
    param: { ShelfId: [101, 102, 161] },
  },
  hotkey: {
    module: "tencent_musicsoso_hotkey.HotkeyService",
    method: "GetHotkeyForQQMusicMobile",
    param: {
      remoteplace: "txt.miniapp.wxada7aab80ba27074",
      searchid: "1559616839293",
    },
  },
};
/**
 * 获取最热歌曲列表
 */
// const getHotSong = () =>
//   axios.get(uURL, {
//     params: {
//       cgiKey: "GetHomePage",
//       _: Date.now(),
//       data: JSON.stringify(Object.assign({comm, ...hotKey}))
//     }
//   });
const getHotSong = () =>
  axios.post(
    uURL,
    JSON.stringify({
      comm: {
        cv: 4747474,
        ct: 24,
        format: "json",
        inCharset: "utf-8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq.json",
        needNewCode: 1,
        uin: 0,
        g_tk_new_20200303: 5381,
        g_tk: 5381,
      },
      req_1: {
        module: "newsong.NewSongServer",
        method: "get_new_song_info",
        param: { type: 5 },
      },
    }),
    {
      params: {
        _: Date.now(),
        sign: "zzbcef69f61ie24rkzhrwwbsqkajyl2gw9406cae3",
      },
    }
  );

/**
 * @description 获取搜索框的联系结果
 * @param {string} keywords 搜索关键字
 */
const keyWords = (keywords) =>
  axios.get(`${cURL}/splcloud/fcgi-bin/smartbox_new.fcg`, {
    params: {
      key: keywords,
      format: "json",
      outCharset: "utf-8",
      is_xml: 0,
    },
  });
/**
 * @description 获取搜索结果
 * @param {string} keywords 搜索关键字
 * @param {number} page 页面
 */
const getSearchResult = (keywords, page = 1) =>
  axios.get(`${cURL}/soso/fcgi-bin/search_for_qq_cp`, {
    params: {
      ...comm,
      w: keywords,
      zhidaqu: 1,
      catZhida: 1,
      t: 0,
      flag: 1,
      ie: "utf-8",
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: 20,
      p: page,
      remoteplace: "txt.mqq.all",
    },
  });

/**
 * @description 获取歌词
 * @param {string} songmid
 */
const getlyric = (songmid) =>
  axios.get(`${cURL}/lyric/fcgi-bin/fcg_query_lyric_new.fcg`, {
    params: {
      format: "json",
      outCharset: "utf-8",
      pcachetime: Date.now(),
      songmid,
    },
    // 将歌词进行解码
    transformResponse(data) {
      data = JSON.parse(data);
      if (data.lyric) {
        data.lyric = new Buffer.from(data.lyric, "base64").toString();
        return data;
      } else {
        throw data;
      }
    },
  });
/**
 * @description 获取歌曲相关信息
 * @param {string} songmid
 */
const getSongData = (songmid) => {
  return axios.get(uURL, {
    params: {
      g_tk: 1124214810,
      loginUin: "0",
      hostUin: 0,
      inCharset: "utf8",
      outCharset: "utf-8",
      format: "json",
      notice: 0,
      platform: "yqq.json",
      needNewCode: 0,
      data: {
        comm: {
          ct: 24,
          cv: 0,
        },
        songinfo: {
          method: "get_song_detail_yqq",
          param: {
            song_type: 0,
            song_mid: songmid,
            song_id: "",
          },
          module: "music.pf_song_detail_svr",
        },
      },
    },
  });
};
/**
 * @description 获取歌曲播放地址
 * @param {string} songmid
 */
const getSongUrl = (songmid) => {
  const data = {
    req_0: {
      module: "vkey.GetVkeyServer",
      method: "CgiGetVkey",
      param: {
        filename: [`M500${songmid}${songmid}.mp3`],
        guid: `${(Math.round(2147483647 * Math.random()) *
          new Date().getUTCMilliseconds()) %
          1e10}`,
        songmid: [songmid],
        songtype: [0],
        uin: "0",
        loginflag: 1,
        platform: "20",
      },
    },
    loginUin: "0",
    comm: {
      uin: "0",
      format: "json",
      ct: 24,
      cv: 0,
    },
  };
  return axios.get(`${uURL}`, {
    params: {
      format: "json",
      sign: "zzannc1o6o9b4i971602f3554385022046ab796512b7012",
      data: JSON.stringify(data),
    },
  });
};
export default {
  getHotSong,
  keyWords,
  getSearchResult,
  getlyric,
  getSongUrl,
  getSongData,
};
