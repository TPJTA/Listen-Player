<template>
  <div id="app">
    <Header />
    <div id="nav">
      <router-link to="/">主页</router-link> |
      <router-link to="/netease">网易云音乐</router-link> |
      <router-link to="/qq">qq音乐</router-link> |
      <router-link to="/kugou">酷狗音乐</router-link>
    </div>
    <router-view/>
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
</style>
