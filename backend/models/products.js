import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
 name: {
  type: String,
 },
 price: {
  type: String,
 },
 rating: {
  type: Number,
 }
});

export default mongoose.model("Products", ProductsSchema);