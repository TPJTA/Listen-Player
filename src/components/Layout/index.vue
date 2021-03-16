<template>
  <div class="layout">
    <div class="main" :style="!isSidebar && 'paddingLeft: 0'">
      <Sidebar :isSidebar="isSidebar" />
      <div class="main-page">
        <Header
          :source="source"
          :changeSidebar="changeSidebar"
          :isSidebar="isSidebar"
        />
        <Nav :source="source" />
        <router-view></router-view>
      </div>
    </div>
    <Player />
  </div>
</template>

<script>
import Header from "./Header";
import Player from "./Player";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
export default {
  name: "layout",
  components: {
    Header,
    Player,
    Nav,
    Sidebar
  },
  data() {
    return {
      source: "netease",
      isSidebar: true
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
  },
  methods: {
    changeSidebar() {
      this.isSidebar = !this.isSidebar;
    }
  }
};
</script>

<style scoped>
.layout {
  height: 100%;
  padding-bottom: 100px;
}
.main {
  padding-left: 200px;
  width: 100%;
  height: 100%;
  display: flex;
  transition: padding 0.5s;
}
.main-page {
  flex: 1;
  height: 100%;
}
</style>
