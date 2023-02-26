const mongoose = require('mongoose')

const Schema = mongoose.Schema

const likeSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    review_id: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
}, { timestamps: true })

module.exports = mongoose.model('Like', likeSchema)