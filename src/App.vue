<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Player />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Player from "@/components/Player";

export default {
  name: "App",
  components: {
    Header,
    Player
  }
};
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
