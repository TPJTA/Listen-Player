<template>
  <div class="nav">
    <router-link to="/netease" active-class="select-a">网易云音乐</router-link>
    | <router-link to="/qq" active-class="select-a">qq音乐</router-link>
  </div>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style scoped lang="less">
.nav {
  margin-left: 20px;
  color: #aaa;
  a {
    margin: 0 5px;
    text-decoration: none;
    &:visited {
      color: #aaa;
    }
  }
}
.select-a {
  position: relative;
  color: black !important;
  &::before {
    position: absolute;
    display: block;
    content: "";
    left: 0;
    bottom: -2px;
    height: 1px;
    width: 100%;
    background: #000;
  }
}
</style>
