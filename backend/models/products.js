import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
 eng: {
  type: String,
 },
 geo: {
  type: String,
 }
})

const ProductsSchema = new mongoose.Schema({
 name: {
  type: translationSchema,
 },
 price: String,
 
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
  type: translationSchema,
 },
});

export default mongoose.model("Products", ProductsSchema);