const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/movimentacao',
    createProxyMiddleware({
      target: 'https://conta-gasto.herokuapp.com',
      changeOrigin: true,
    })
  );
};