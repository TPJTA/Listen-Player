<template>
  <transition name="fade">
    <div class="modal" v-if="isShow" @click.stop>
      <div class="modal-title" v-if="title">
        {{ title }}
        <i class="iconfont" @click="hidden">&#xe601;</i>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  model: {
    prop: "isShow",
    event: "show"
  },
  props: {
    isShow: Boolean,
    title: String
  },
  methods: {
    hidden() {
      this.$emit("show", false);
    }
  },
  mounted() {
    document.addEventListener("click", this.hidden);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hidden);
  }
};
</script>

<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
 .fade-leave-to {
  opacity: 0;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  padding: 5px 0;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  &-title {
    position: relative;
    font-size: 18px;
    font-weight: bold;
    line-height: 40px;
    padding: 0 16px;
    border-bottom: 1px solid #e5e5e5;
    .iconfont {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>
