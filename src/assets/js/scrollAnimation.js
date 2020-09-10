/**
 * @function 利用requestAnimationFrame实现滚动条过渡动画
 * @param {Number} scrollY 滚动到的Y轴位置
 * @param {HTMLElement} scrollDOM 滚动的dom对象
 * @param {Number} duration 过渡时间，单位为秒
 */
let mark;
export function scrollAnimation(scrollY, scrollDOM, duration) {
    if(scrollDOM && scrollDOM.scrollHeight > scrollDOM.clientHeight && scrollY >= 0) {
        let start;
        duration = duration * 1000
        const transitionFn = (timestamp) => {
            if(!start) start = timestamp
            const elapsed = timestamp - start
            scrollDOM.scrollTop += (scrollY-scrollDOM.scrollTop)/duration*elapsed
            if(elapsed < duration) {
                mark = window.requestAnimationFrame(transitionFn)
            }
        }
        mark = window.requestAnimationFrame(transitionFn)
    }
}
/**
 * @function 中断动画
 */
export function abortAnimation() {
    window.cancelAnimationFrame(mark)
}