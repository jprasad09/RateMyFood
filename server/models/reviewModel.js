const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  restaurant_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  images: {
    type: [String],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  likes: {
    type: Number,
  },
  comments: {
    type: [Schema.Types.ObjectId],
  },
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema)