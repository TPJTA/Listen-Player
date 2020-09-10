<template>
  <div id="app">
    <Header />
    <div id="nav">
      <router-link to="/netease">网易云音乐</router-link> |
      <router-link to="/qq">qq音乐</router-link> |
      <router-link to="/kugou">酷狗音乐</router-link> |
      <router-link to="/song">酷狗音乐</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player/>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Player from "@/components/Player"
export default {
  name: "App",
  components: {
    Header,
    Player
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
body {
  padding-bottom: 80px;
}
</style>
