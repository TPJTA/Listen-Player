import Vue from "vue";
import Vuex from "vuex";
import newSong from "./module/newSong";
import playSong from "./module/playSong";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    playSong,
    newSong,
  },
});
