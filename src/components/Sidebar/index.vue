<template>
  <div class="sidebar" :class="{ 'no-sidebar': isSidebar }"></div>
</template>

<script>
export default {
  name: "sidebar",
  props: {
    isSidebar: Boolean
  }
};
</script>

<style lang="less" scoped>
.sidebar {
  width: 200px;
  height: 100%;
  background: rgb(248, 248, 248);
  transition: width 0.3s;
  border-right: 1px solid rgb(229, 229, 229);
}
.no-sidebar {
  width: 0;
}
</style>
