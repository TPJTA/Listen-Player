import CryptoJS from "crypto-js";
function _aes_encrypt(text, sec_key) {
  //下面函数依赖的函数
  let key = CryptoJS.enc.Utf8.parse(sec_key);
  // The initialization vector, which must be 16 bytes
  let iv = CryptoJS.enc.Utf8.parse("0102030405060708");
  let decrypt = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypt.toString();
}
function getRequest(data) {
  //请求加密的方法
  const encText = "0CoJUm6Qyw8W8jud";
  data = JSON.stringify(data);
  const index = Math.floor(Math.random() * 3);
  const sec_key = (function() {
    const arr = ["abcdefghijklmnop", "qrstuvwxyzABCDEF", "IJKLMNOPQRSTUVWX"];
    return arr[index];
  })();
  const enc_sec_key = (function() {
    const arr = [
      "d15a1683c992095d0c234c19966605c5c5964911268bbeda8cb8d08d834913e59d53b32358903a121b5fca784c1f5ae44951fd02524df58ecc98e52cc7cf8689b42c2e93ddf05b0592512d87f5960467e2f086c018849d76014d323500e30f13ef4cafbb0cf5a66731a3f1776c75ca35d0062dac70a3e33245afabcf47938487",
      "9157445f32fc81cff73e862b3b1602135a5d99f322dd8e36365c6d225e1d5e536197874cfc6416339f11af79910d35ffe3607146e75fb37850fed7100074e847126fca5fa0dc0c1add59fcdc07fb179ca250f2c230696ea853cdeba6065bae3b23459cf495e0ba2c2b82565ff350e81bb2fc3726c7074eaae4d327722cb5ed9f",
      "8d4309ec2852dd4ed3f265a7b76f9a1f15c48726fee438d82b3ca7d283c9c9e5a8c962c9dc5a162c038e57c1f70e19ae80e7d74c22b8a57659359e7080360012de5377eb7368bcad706a5daae2e13cedb9ffb982f77013e9b9cf27ebe923239e33dbfe8b5dee3631bc813bd075d891ce0d324e465b833fea1cfca05e1d7ebf24",
    ];
    return arr[index];
  })();
  const enc_text = _aes_encrypt(_aes_encrypt(data, encText), sec_key);
  return { params: enc_text, encSecKey: enc_sec_key };
}
export default getRequest;
