const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://react-admin-dashboard-20221227.vercel.app',
      // target: 'http://127.0.0.1:5001',
      ws: false,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }),
  )
}
