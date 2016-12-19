'use strict';

import mongoose from 'mongoose';

const User = new mongoose.Schema({
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