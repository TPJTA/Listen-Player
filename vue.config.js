module.exports = {
    devServer: {
        port: 8080,
        host: "localhost",
        https: false,
        open: true,
        "proxy": {
            "/netServe": {
                target: "https://interface.music.163.com",
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/netServe': ""
                }
            }
        }
    }
}