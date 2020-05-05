module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://182.92.128.115", // 转发的目标url
        changeOrigin: true, // 支持跨域
      },
    },
  },
};
