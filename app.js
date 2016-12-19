'use strict';

import Express from 'express';
import mongoose from 'mongoose';
import config from './resource/config/enviroment';

const app = new Express();

// Connect to DB
mongoose.connect(
  `${config.database.mongo.host}/${config.database.mongo.db}`,
  config.database.mongo.options
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
