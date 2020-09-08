"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSongData = getSongData;
exports.getNewSong = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _aesJs = _interopRequireDefault(require("aes-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _aes_encrypt(text, sec_key) {
  //下面函数依赖的函数
  var pad = 16 - text.length % 16;

  for (var i = 0; i < pad; i += 1) {
    text += String.fromCharCode(pad); // eslint-disable-line no-param-reassign
  }

  var key = _aesJs["default"].utils.utf8.toBytes(sec_key); // The initialization vector, which must be 16 bytes


  var iv = _aesJs["default"].utils.utf8.toBytes('0102030405060708');

  var textBytes = _aesJs["default"].utils.utf8.toBytes(text);

  var aesCbc = new _aesJs["default"].ModeOfOperation.cbc(key, iv); // eslint-disable-line new-cap

  var cipherArray = [];

  while (textBytes.length !== 0) {
    var block = aesCbc.encrypt(textBytes.slice(0, 16));
    Array.prototype.push.apply(cipherArray, block);
    textBytes = textBytes.slice(16);
  }

  var ciphertext = '';

  for (var _i = 0; _i < cipherArray.length; _i += 1) {
    ciphertext += String.fromCharCode(cipherArray[_i]);
  }

  ciphertext = btoa(ciphertext);
  return ciphertext;
}

function getRequest(data) {
  //请求加密的方法
  var encText = '0CoJUm6Qyw8W8jud';
  data = JSON.stringify(data);
  var index = Math.floor(Math.random() * 3);

  var sec_key = function () {
    var arr = ["abcdefghijklmnop", "qrstuvwxyzABCDEF", "IJKLMNOPQRSTUVWX"];
    return arr[index];
  }();

  var enc_sec_key = function () {
    var arr = ["d15a1683c992095d0c234c19966605c5c5964911268bbeda8cb8d08d834913e59d53b32358903a121b5fca784c1f5ae44951fd02524df58ecc98e52cc7cf8689b42c2e93ddf05b0592512d87f5960467e2f086c018849d76014d323500e30f13ef4cafbb0cf5a66731a3f1776c75ca35d0062dac70a3e33245afabcf47938487", "9157445f32fc81cff73e862b3b1602135a5d99f322dd8e36365c6d225e1d5e536197874cfc6416339f11af79910d35ffe3607146e75fb37850fed7100074e847126fca5fa0dc0c1add59fcdc07fb179ca250f2c230696ea853cdeba6065bae3b23459cf495e0ba2c2b82565ff350e81bb2fc3726c7074eaae4d327722cb5ed9f", "8d4309ec2852dd4ed3f265a7b76f9a1f15c48726fee438d82b3ca7d283c9c9e5a8c962c9dc5a162c038e57c1f70e19ae80e7d74c22b8a57659359e7080360012de5377eb7368bcad706a5daae2e13cedb9ffb982f77013e9b9cf27ebe923239e33dbfe8b5dee3631bc813bd075d891ce0d324e465b833fea1cfca05e1d7ebf24"];
    return arr[index];
  }();

  var enc_text = _aes_encrypt(_aes_encrypt(data, encText), sec_key);

  return {
    params: enc_text,
    encSecKey: enc_sec_key
  };
}

var getNewSong = function getNewSong() {
  return _axios["default"].post("/netServe/weapi/personalized/newsong", _qs["default"].stringify(getRequest({
    limit: 10
  })));
};

exports.getNewSong = getNewSong;

var getlyric = function getlyric(id) {
  return _axios["default"].post("/netServe/weapi/song/lyric", _qs["default"].stringify(getRequest({
    id: id,
    lv: 0,
    tv: 0
  })));
};

var getPlaySong = function getPlaySong(id) {
  return _axios["default"].post("/netServe/weapi/song/enhance/player/url/v1", _qs["default"].stringify(getRequest({
    ids: "[".concat(id, "]"),
    level: "standard",
    encodeType: "aac"
  })));
};

function getSongData(id) {
  var _ref, _ref2, lyric, playSong;

  return regeneratorRuntime.async(function getSongData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Promise.all([getlyric(id), getPlaySong(id)]));

        case 2:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 2);
          lyric = _ref2[0];
          playSong = _ref2[1];
          console.log(playSong);
          return _context.abrupt("return", {
            lyric: lyric.data,
            playSong: playSong.data.data[0]
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}