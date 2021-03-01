/**
 * @description 利用requestAnimationFrame实现滚动条过渡动画
 * @param {Number} scrollY 滚动到的Y轴位置
 * @param {HTMLElement} scrollDOM 滚动的dom对象
 * @param {Number} duration 过渡时间，单位为秒
 */
let mark;
export function scrollAnimation(scrollY, scrollDOM, duration) {
  if (
    scrollDOM &&
    scrollDOM.scrollHeight > scrollDOM.clientHeight &&
    scrollY >= 0
  ) {
    let start;
    duration = duration * 1000;
    const transitionFn = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      scrollDOM.scrollTop +=
        ((scrollY - scrollDOM.scrollTop) / duration) * elapsed;
      if (elapsed < duration) {
        mark = window.requestAnimationFrame(transitionFn);
      }
    };
    mark = window.requestAnimationFrame(transitionFn);
  }
}
/**
 * @description 中断动画
 */
export function abortAnimation() {
  window.cancelAnimationFrame(mark);
}

/**
 * @description 将秒转成分钟
 * @param {number} seconds 秒
 * @returns [分, 秒]
 */
export function secondsToMinutes(seconds) {
  seconds = Math.floor(seconds);
  let minutes = String(Math.floor(seconds / 60));
  seconds = String(seconds % 60);
  if (/^\d$/.test(minutes)) {
    minutes = "0" + minutes;
  }
  if (/^\d$/.test(seconds)) {
    seconds = "0" + seconds;
  }
  return [minutes, seconds];
}

//获取界面显示的歌手名
export function getSongArtists(artistsArr) {
  let nameArr = artistsArr.map((item) => item.name);
  return nameArr.join("/");
}
