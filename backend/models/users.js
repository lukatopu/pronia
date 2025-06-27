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
  },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ],
  wishlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  ],
  orders: [
    {
      id: { type: String },
      date: { type: String },
      status: { type: String },
      total: { type: String }
    }
  ], addresses: [
  {
    country: String,
    firstName: String,
    lastName: String,
    company: String,
    address: String,
    city: String,
    state: String,
    postcode: String,
    email: String,
    phone: String,
  }
]





});

export default mongoose.model('Users', UsersSchema);
