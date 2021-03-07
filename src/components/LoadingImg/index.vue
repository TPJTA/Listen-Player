<template>
  <div class="loading-img" v-show="isShow">
    <div class="loading-dot">
      <i class="loading-dot-item"></i>
      <i class="loading-dot-item"></i>
      <i class="loading-dot-item"></i>
      <i class="loading-dot-item"></i>
    </div>
  </div>
</template>

<script>
/**
 * @description 为图标添加加载中模块
 * @attention 父元素必须设置为position: relative;
 */
export default {
  name: "LoadingImg",
  props: {
    isShow: Boolean
  }
};
</script>

<style lang="less" scoped>
@keyframes Loading {
  from {
    transform: translate(-50%, -50%) rotate(0);
    transform-origin: 50% 50%;
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
    transform-origin: 50% 50%;
  }
}
.loading-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #666;
}
.loading-dot {
  position: relative;
  display: inline-block;
  top: 50%;
  left: 50%;
  height: 50%;
  width: 32px;
  height: 38px;
  animation-name: Loading;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  &-item {
    position: absolute;
    width: 14px;
    height: 14px;
    background-color: #1890ff;
    border-radius: 50%;
    &:nth-of-type(1) {
      top: 0;
      left: 0;
      opacity: 1;
    }
    &:nth-of-type(2) {
      top: 0;
      right: 0;
      opacity: 0.85;
    }
    &:nth-of-type(3) {
      bottom: 0;
      left: 0;
      opacity: 0.7;
    }
    &:nth-of-type(4) {
      bottom: 0;
      right: 0;
      opacity: 0.55;
    }
  }
}
</style>
