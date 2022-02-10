const express = require('express');
const config = require('./utils/config');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
