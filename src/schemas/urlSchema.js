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
  },
  requests: [{
    origin: String,
    date: Date
  }]
});

Url.index({shortUrl: 1});

export default mongoose.model('Url', Url);
