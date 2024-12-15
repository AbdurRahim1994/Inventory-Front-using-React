const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://inventory-management-dfkryo2js-abdurrahim1994s-projects.vercel.app',
            changeOrigin: true,
        })
    );
};