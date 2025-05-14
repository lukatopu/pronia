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
 },
 image: {
  type: String,
 },
 hoverImage: {
  type: String,
 },
 description: {
  type: String,
 },
});

export default mongoose.model("Products", ProductsSchema);