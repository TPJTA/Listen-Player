
<template>
  <div class="loading-outter" >
    <div class="mask" v-if="isMask">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <slot></slot>
  </div>
  
</template>

<script>
/**
 * 作用：为组件添加加载中的蒙版
 * 方法：使用组件时传递isMask，为true显示，为false不显示
 */
export default {
  props:{isMask: Boolean}
}
</script>

<style scoped lang="less">
.loading-outter {
    position: relative;
}
@keyframes maskAnimation {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: .5;
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.mask {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 99;
    justify-content: center;
    align-items: center;
    background: #fff;
    .span-for(@n,@i:1) when(@i <= @n) {
      span:nth-of-type(@{i}) {
        margin: 0 .5%;
        padding-top: 5%;
        width: 5%;
        border-radius: 50%;
        background: negation(#ff6600 * @i, #0000ff / @i);
        animation: maskAnimation 1s infinite .1s*@i; 
      }
      .span-for(@n, @i+1)
    }
    .span-for(5)
}
</style>