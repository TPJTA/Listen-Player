/**
 * 网络启用了代理，请根据设置的请求头请求不同地址
 *   /netServe: https://interface.music.163.com
 */
import axios from "../http";
export { getNewSong, getSongData, keyWords, getSearchResult };
/**
 * 获取最新歌曲列表
 * @param {number} limit 获取数量?好像只能获取10个
 */
const getNewSong = (limit = 10) => {
  console.log(1);
  return axios.post("/netServe/weapi/personalized/newsong", { limit });
};

/**
 * @description 获取歌词
 * @param {number} id 歌曲列表
 */
const getlyric = (id) =>
  axios.post("/netServe/weapi/song/lyric", { id: id, lv: 0, tv: 0 });

/**
 * @description 获取歌曲的相关信息
 * @param {number} id 歌曲id
 */
const getPlaySong = (id) =>
  axios.post("/netServe/weapi/song/enhance/player/url/v1", {
    ids: `[${id}]`,
    level: "standard",
    encodeType: "aac",
  });

/**
 * @description 同时获取歌曲的信息和歌词
 * @param {number} id 歌曲id
 */
async function getSongData(id) {
  let [lyric, playSong] = await Promise.all([getlyric(id), getPlaySong(id)]);
  return { lyric, playSong: playSong.data[0] };
}

/**
 * @description 获取搜索框的联系结果
 * @param {string} keywords 搜索关键字
 */
const keyWords = (keywords) =>
  axios.post("/netServe/weapi/search/suggest/keyword", { s: keywords });

/**
 * @description 获取搜索结果
 * @param {string} keywords 搜索关键字
 * @param {number} page 页面
 */
const getSearchResult = (keywords, page = 1) =>
  axios.post("/netServe/weapi/search/get", {
    s: keywords,
    limit: 20,
    offset: 20 * (page - 1),
    type: 1,
    strategy: 5,
    queryCorrect: true,
  });
