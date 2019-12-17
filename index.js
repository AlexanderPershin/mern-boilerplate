const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');

const { MONGO_URI, PORT, COOKIE_KEY } = require('./config/keys');

require('./models/User'); // Model loaded first to be able to use it inside helpers/passport
require('./models/Ariticle');

require('./helpers/passport');

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (!err) {
      console.log(`Connected to "${MONGO_URI}"...`);
    } else {
      console.log(`Can not connect to mongodb...`);
    }
  }
);

const app = express();

// Parsing req.body json or URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// lasts 30 days in milliseconds
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Authentication routes
require('./routes/authRoutes')(app);
// Articles routes
require('./routes/articlesRoutes')(app);

// Set app behaviour for production mode
// Heroku sets NODE_ENV to production automatically
if (process.env.NODE_ENV === 'production') {
  // Serve js and css
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  // Send index.html for all unregisteret api routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is up on "http://localhost:${PORT}"...`);
});
