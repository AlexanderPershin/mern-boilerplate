const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send({ msg: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server is up on "http://localhost:${PORT}"...`);
});
