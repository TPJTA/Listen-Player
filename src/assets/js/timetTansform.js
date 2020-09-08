export {
    secondsToMinutes
}
/**
 * 
 * 作用:将秒转成分钟
 * 结果: [分, 秒]
 */
function secondsToMinutes(seconds) {
  seconds = Math.floor(seconds)
  let minutes = String(Math.floor(seconds / 60))
  seconds = String(seconds % 60)
  if(/^\d$/.test(minutes)) {
    minutes = "0" + minutes
  }
  if(/^\d$/.test(seconds)) {
    seconds = "0" + seconds
  }
  return [minutes, seconds]
}