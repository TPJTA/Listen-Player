<template>
  <div class="nav" v-if="!isSearch" v-show="!isSongPage">
    <router-link to="/netease" :class="{ 'select-a': source === 'netease' }"
      >网易云音乐</router-link
    >
    |
    <router-link to="/qq" :class="{ 'select-a': source === 'qq' }"
      >qq音乐</router-link
    >
  </div>
  <div class="nav c" v-else v-show="!isSongPage">
    <a @click="searchNetease" :class="{ 'select-a': source === 'netease' }"
      >网易云音乐</a
    >
    |
    <a @click="searchQQ" :class="{ 'select-a': source === 'qq' }">qq音乐</a>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: {
    source: String
  },
  data() {
    return {
      isSearch: false,
      isSongPage: false
    };
  },
  methods: {
    searchNetease() {
      this.$router.push({
        path: `/search/netease`,
        query: { name: this.$router.history.current.query.name }
      });
    },
    searchQQ() {
      this.$router.push({
        path: `/search/qq`,
        query: { name: this.$router.history.current.query.name }
      });
    }
  },
  watch: {
    $route(to) {
      if (to.name === "Search") {
        this.isSearch = true;
      } else {
        this.isSearch = false;
      }
      if (to.name === "Song") {
        this.isSongPage = true;
      } else {
        this.isSongPage = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.nav {
  margin-top: 10px;
  margin-left: 15px;
  color: #aaa;
  font-size: 16px;
  a {
    margin: 0 5px;
    text-decoration: none;
    cursor: pointer;
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
