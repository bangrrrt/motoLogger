const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MotorcycleSchema = new Schema({
  logs: {
    type: Array,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: false
  },
  model: {
    type: String,
    required: false
  },
  year: {
    type: Date,
    required: false
  },
  image: { // Check for file size limits
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Motorcycle', MotorcycleSchema);