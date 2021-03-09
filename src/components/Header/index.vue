<template>
  <div class="header">
    <i class="iconfont header-songSheet-button">&#xe6a1;</i>
    <img
      class="header-img"
      @click="goMain"
      :src="require('@/assets/img/logo.png')"
      alt=""
    />
    <HeaderSearch :source="source" />
    <div class="header-button-outter">
      <i class="iconfont header-button" @click="backward">&#xe622;</i>
      <i class="iconfont header-button" @click="forward">&#xe622;</i>
    </div>
  </div>
</template>

<script>
import HeaderSearch from "./HeaderSearch";
export default {
  name: "Header",
  props: { source: String },
  components: {
    HeaderSearch
  },
  methods: {
    forward() {
      this.$router.go(1);
    },
    backward() {
      this.$router.go(-1);
    },
    goMain() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="less">
.header {
  padding: 12px 20px;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(229, 229, 229);
  background: rgb(248, 248, 248);
}
.header-img {
  display: inline-block;
  height: 100%;
  margin-left: 30px;
  cursor: pointer;
}
.header-songSheet-button {
  font-size: 22px;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
}
.header-button-outter {
  display: inline-block;
}
.header-button {
  display: inline-block;
  padding: 2px 5px;
  font-size: 16px;
  vertical-align: middle;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:nth-of-type(1) {
    transform: rotate(180deg);
  }
  &:hover {
    opacity: 1;
  }
}
</style>
