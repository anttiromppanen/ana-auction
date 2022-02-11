require('dotenv').config();

const { PORT } = process.env;
const { MONGODB_URI } = process.env;
const { API_KEY } = process.env;

module.exports = {
  API_KEY,
  MONGODB_URI,
  PORT,
};
