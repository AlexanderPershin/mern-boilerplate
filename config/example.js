// Example config/dev.js file for development
module.exports = {
  googleClientId: '123456789012-blablabla.apps.googleusercontent.com',
  googleClientSecret: 'googleclientsecretestring',
  MONGO_URI: 'mongodb://localhost:27017/mydatabase',
  COOKIE_KEY: 'cookiekeystring',
  PORT: 3001
};
// googleClientId and googleClientSecret were copied from google console webclient (google+ auth)
// MONGO_URI - mydatabase will be autogenerated on starting application
// COOKIE_KEY - any string
// PORT - any free port on computer
