const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
  },
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)