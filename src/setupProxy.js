const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://192.168.1.164:8080/capela',
        changeOrigin: true,
        pathRewrite: {'^/api': ''},
      }),
  );
};
