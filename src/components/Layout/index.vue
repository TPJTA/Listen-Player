<template>
  <div class="layout">
    <div class="main">
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
import Header from "@/components/Header";
import Player from "@/components/Player";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
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
  width: 100%;
  height: 100%;
  display: flex;
}
.main-page {
  flex: 1;
  height: 100%;
}
</style>
