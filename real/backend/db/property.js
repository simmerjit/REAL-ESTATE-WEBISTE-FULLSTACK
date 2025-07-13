const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  price: String,
  address: String,
  imageUrl: String,
  description: String,
  lat: Number,
  lng: Number,
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property