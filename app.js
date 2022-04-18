const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const craftablesRouter = require('./controllers/craftables');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const craftablesAlchemyRouter = require('./controllers/craftables_alchemy');
const craftablesTailoringRouter = require('./controllers/craftables_tailoring');
const auctionDataRouter = require('./controllers/auctionData');
require('express-async-errors');

const app = express();

logger.info('Connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/craftables', craftablesRouter);
app.use('/api/craftables/alchemy', craftablesAlchemyRouter);
app.use('/api/craftables/tailoring', craftablesTailoringRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/auctiondata', auctionDataRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
