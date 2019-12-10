const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

require('./helpers/passport');

app.get('/', (req, res) => {
  res.send({ msg: 'hello world!' });
});

// Authentication routes
require('./routes/authRoutes')(app);

app.listen(PORT, () => {
  console.log(`Server is up on "http://localhost:${PORT}"...`);
});
