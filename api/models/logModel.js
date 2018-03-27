const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  logItems: {
    type: Array,
    default: []
  }
});

module.exports = LogSchema;