<template>
  <div id="app">
    <LayOut />
  </div>
</template>

<script>
import LayOut from "@/components/Layout";

export default {
  name: "App",
  components: {
    LayOut
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
html {
  height: 100%;
}
#app {
  height: 100%;
}
li {
  list-style: none;
}
body {
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #515a6e;
}
:after,
:before {
  box-sizing: border-box;
}
.app {
  height: 100%;
}
.iconfont {
  user-select: none;
}
a {
  color: #aaa;
  text-decoration: none;
}
</style>
