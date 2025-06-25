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
 categorie: {
  type: [String],
 },
 color: {
  type: String,
 },
});

export default mongoose.model('Product', ProductsSchema);