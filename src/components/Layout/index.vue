<template>
  <div class="layout">
    <div class="main">
      <Header :source="source" />
      <Nav :source="source" />
      <router-view></router-view>
      <Player />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Player from "@/components/Player";
import Nav from "@/components/Nav";

export default {
  name: "layout",
  components: {
    Header,
    Player,
    Nav
  },
  data() {
    return {
      source: "netease"
    };
  },
  watch: {
    $route(to) {
      if (/netease/.test(to.path)) {
        this.source = "netease";
      } else if (/qq/.test(to.path)) {
        this.source = "qq";
      }
    }
  }
};
</script>

<style>
.layout {
  height: 100%;
  box-sizing: content-box;
}
.main {
  padding-bottom: 100px;
  width: 100%;
  height: 100%;
}
</style>
