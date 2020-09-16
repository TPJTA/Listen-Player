<template>
  <div class="header">
    <img :src="require('@/assets/logo.png')" alt="" class="logo">
    <i class="iconfont header-button">&#xe622;</i>
    <i class="iconfont header-button">&#xe622;</i>
    <HeaderSearch/>
  </div>
</template>

<script>
import HeaderSearch from "./HeaderSearch"
export default {
  name: "Header",
  components:{
    HeaderSearch
  }
}
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
  border-left: .5px solid pink;
  border-radius: 0 5px 5px 0 ;
  &:nth-of-type(1) {
    transform: rotate(180deg);
  }
}

</style>