const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartSchema = new Schema({
  partName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: false
  }
});

const LogSchema = new Schema({
  _id: {
    type: String
  },
  logId: {
    type: String,
    required: true
  },
  parts: [PartSchema],
  motorcycleId: {
    type: String,
    required: true
  },
  logName: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  miles: {
    type: Number,
    required: false
  },
}, {
  strict: 'throw',
  useNestedStrict: true
});

module.exports = mongoose.model('Log', LogSchema);