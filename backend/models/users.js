import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
 firstName: {
  type: String,
 },
 lastName: {
  type: String,
 },
 email: {
  type: String,
  match: [
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
   'Please provide a valid email',
  ],
 },
 password: {
  type: String,
 }
})

export default mongoose.model('Users', UsersSchema)