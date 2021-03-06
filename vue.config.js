const path = require('path');

module.exports = {
  publicPath: "/player",
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
      extensions: ['.vue', '.js'],
      mainFiles: ['index'],
    },
  },
  devServer: {
    port: 8080,
    host: 'localhost',
    https: false,
    open: true,
    proxy: {
      '/netServe': {
        target: 'https://interface.music.163.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/netServe': '',
        },
      },
      '/uQQ': {
        target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/uQQ': '',
        },
        headers: { referer: 'https://y.qq.com/portal/player.html', host: 'u.y.qq.com' },
      },
      '/cQQ': {
        target: 'https://c.y.qq.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/cQQ': '',
        },
        headers: { referer: 'https://y.qq.com/portal/player.html', host: 'u.y.qq.com' },
      },
      "/iQQ": {
        target: "http://isure.stream.qqmusic.qq.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/iQQ': '',
        },
        headers: { referer: 'https://y.qq.com/portal/player.html', host: 'u.y.qq.com' },
      }
    },
  },
};
