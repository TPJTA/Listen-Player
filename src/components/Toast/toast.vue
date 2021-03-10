<template>
  <transition name="toast">
    <div
      class="app-toast"
      v-if="isShow"
      :class="{
        info: type === 'info',
        success: type === 'success',
        wraning: type === 'wraning',
        danger: type === 'danger'
      }"
    >
      {{ text }}
    </div>
  </transition>
</template>
<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s;
}
.toast-enter,
.toast-leave-to {
  top: 0 !important;
  opacity: 0;
}
.app-toast {
  position: fixed;
  top: 20px;
  left: 50%;
  background: #ccc;
  padding: 10px;
  border-radius: 5px;
  transform: translateX(-50%);
  color: #fff;
}
.info {
  background: #00aaee;
}
.success {
  background: #00ee6b;
}
.wraning {
  background: #eea300;
}
.danger {
  background: #ee000c;
}
</style>
