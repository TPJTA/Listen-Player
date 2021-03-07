<template>
  <div class="header">
    <img :src="require('@/assets/img/logo.png')" alt="" class="logo" />
    <i class="iconfont header-button" @click="backward">&#xe622;</i>
    <i class="iconfont header-button" @click="forward">&#xe622;</i>
    <HeaderSearch />
    <Nav />
  </div>
</template>

<script>
import HeaderSearch from './HeaderSearch';
import Nav from './Nav';

export default {
  name: 'Header',
  components: {
    HeaderSearch,
    Nav,
  },
  methods: {
    forward() {
      this.$router.go(1);
    },
    backward() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
.logo {
  margin-right: 100px;
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
.header-button {
  display: inline-block;
  padding: 2px 5px;
  font-size: 16px;
  vertical-align: middle;
  border: 1px solid pink;
  border-left: 0.5px solid pink;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  &:nth-of-type(1) {
    transform: rotate(180deg);
  }
}
</style>
