import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
  const routes = [
  {
    path: '/netease',
    name: 'Netease',
    props() {
      return {type: "netease"}
    },
    component: () => import('../views/NewSong')
  },
  {
    path: '/song',
    name: 'Song',
    component: () => import('../views/SongPage'),
    beforeEnter:(to, from, next) => {
      if(store.getters.playingSong.id) {
        next()
      }else {
        next(false)
      }
    }
  },
  {
    path: "/search/:name",
    name: "Search",
    component: () => import("../views/SearchResult"),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
