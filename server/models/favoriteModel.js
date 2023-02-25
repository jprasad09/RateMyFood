const mongoose = require('mongoose')

const Schema = mongoose.Schema

const favoriteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  restaurant_id: {
    type: String,
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model('Favorite', favoriteSchema)