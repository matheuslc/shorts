const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  user: {
    type: String,
    unique: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

Url.index({user: 1});

module.exports = mongoose.model('User', User);