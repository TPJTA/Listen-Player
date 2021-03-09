import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "/",
    redirect: "/netease"
  },
  {
    path: "/netease",
    name: "Netease",
    props() {
      return { type: "netease" };
    },
    component: () => import("../views/NewSong/netease"),
  },
  {
    path: "/qq",
    name: "QQ",
    props() {
      return { type: "qq" };
    },
    meta: {
      sourse: "b"
    },
    component: () => import("../views/NewSong/qq"),
  },
  {
    path: "/song",
    name: "Song",
    component: () => import("../views/SongPage"),
    beforeEnter: (to, from, next) => {
      if (store.getters.playingSong.id) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/search/:source",
    name: "Search",
    component: () => import("../views/SearchResult"),
    props: (router) => {
      return {
        source: router.params.source,
        name: router.query.name
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
