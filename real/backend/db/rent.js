import mongoose from 'mongoose';

const rentSchema = new mongoose.Schema({
  title: String,
  price: String,
  address: String,
  imageUrl: String,
  description: String,
  lat: Number,
  lng: Number,
});

const Rent = mongoose.model("Rents", rentSchema);
export default Rent;