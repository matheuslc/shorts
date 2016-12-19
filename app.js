'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './resource/config/enviroment';

let app = new express();

// Connect to DB
const connection = mongoose.connect(
  `${config.database.mongo.host}/${config.database.mongo.db}`,
  config.database.mongo.options
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;