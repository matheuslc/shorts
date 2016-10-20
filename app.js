const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const config     = require('./resource/config/enviroment');

// Connect to DB
let connection = mongoose.connect(
  `${config.database.mongo.host}/${config.database.mongo.db}`,
  config.database.mongo.options
);

// Routes
let urls  = require('./routes/urls');
let users = require('./routes/users');
let stats = require('./routes/stats');
let app   = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/urls', urls);
app.use('/users', users);
app.use('/stats', stats);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;