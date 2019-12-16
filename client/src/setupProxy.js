const proxy = require('http-proxy-middleware');

// This file is automatically recognized by create-react-app
// It creates proxies for the following routes
module.exports = function(app) {
  app.use(proxy('/auth/google', { target: 'http://localhost:3001/' }));
  app.use(proxy('/api', { target: 'http://localhost:3001/' }));
};

// Or /api/* if not working