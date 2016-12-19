'use strict';

import mongoose from 'mongoose';

const Url = new mongoose.Schema({
  url: String,
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  hits: {
    count: Number,
    lastHit: {
      type: Date,
      default: Date.now
    }
  },
  created: {
    type: Date,
    default: Date.now
  }
  requests: [
    {
      origin: String,
      date: Date
    }
  ],
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

Url.index({shortUrl: 1});

module.exports = mongoose.model('Url', Url);