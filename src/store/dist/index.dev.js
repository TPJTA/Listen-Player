"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    playingSong: {
      name: "aaa",
      id: "1472862669"
    }
  },
  mutations: {
    setPlayingSong: function setPlayingSong(state, val) {
      if (val.name && val.id) {
        state.playingSong.name = val.name;
        state.playingSong.id = val.id;
      } else {
        state.playingSong.name = null;
        state.playingSong.id = null;
      }
    }
  },
  actions: {},
  modules: {}
});

exports["default"] = _default;