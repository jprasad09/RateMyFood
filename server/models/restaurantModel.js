const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Review = require('../models/reviewModel')

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
  },
  average_rating: {
    type: Number,
    default: 0
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true })

restaurantSchema.index({name: 'text'})

restaurantSchema.methods.generateAuthToken = async function(){
  try{
    let token = jwt.sign({ _id: this._id}, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
  }catch(error){
    console.log(error)
  }
}

restaurantSchema.post(['save', 'findOneAndUpdate', 'findOneAndDelete'], async function(doc, next) {
  try {
    const restaurant_id = doc._id;
    const reviews = await Review.find({ restaurant_id });
    const numReviews = reviews.length;
    const sumRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    const avgRating = sumRatings / numReviews || 0;
    await doc.updateOne({ average_rating: avgRating });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema)