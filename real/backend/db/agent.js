const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String, // Optional profile picture URL
  },
});

module.exports = mongoose.model('Agents', agentSchema);