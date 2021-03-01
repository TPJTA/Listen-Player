const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
      extensions: [".vue", ".js"],
      mainFiles: ["index"],
    },
  },
  devServer: {
    port: 8080,
    host: "localhost",
    https: false,
    open: true,
    proxy: {
      "/netServe": {
        target: "https://interface.music.163.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/netServe": "",
        },
      },
    },
  },
};
