'use strict';

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './resource/config/enviroment';
import urlsRoutes from './src/routes/url';

const app = new express();

// Connect to DB
mongoose.connect(`${config.database}`);

// Use ES6 promises
mongoose.Promise = global.Promise;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));

// Routes register
app.use('/', urlsRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
