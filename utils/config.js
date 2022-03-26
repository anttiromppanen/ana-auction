require('dotenv').config();

const { PORT } = process.env;
const { MONGODB_URI } = process.env;
const { CLIENT_ID } = process.env;
const { CLIENT_SECRET } = process.env;

module.exports = {
  PORT,
  MONGODB_URI,
  CLIENT_ID,
  CLIENT_SECRET,
};
