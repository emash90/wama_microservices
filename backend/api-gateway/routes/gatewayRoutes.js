const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  // Route for tenant service
  app.use('/tenant', createProxyMiddleware({
    target: process.env.TENANT_SERVICE_URL || 'http://localhost:4001',
    changeOrigin: true,
    pathRewrite: {
      '^/tenant': '', 
    },
  }));

  // Route for house service
  app.use('/house', createProxyMiddleware({
    target: process.env.HOUSE_SERVICE_URL || 'http://localhost:4002',
    changeOrigin: true,
    pathRewrite: {
      '^/house': '',
    },
  }));

  // Route for payment service
  app.use('/payment', createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE_URL || 'http://localhost:4003',
    changeOrigin: true,
    pathRewrite: {
      '^/payment': '', 
    },
  }));
};
