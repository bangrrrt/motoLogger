const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  motorcycleId: {
    type: String,
    required: true
  },
  logId: {
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
  parts: {
    type: Array,
    required: false
  },
  miles: {
    type: Number,
    required: false
  },
});

module.exports = mongoose.model('Log', LogSchema);