const mongoose = require('mongoose')

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone_no: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
    unique: true,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  cuisine: {
    type: [String],
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Restaurant', restaurantSchema)