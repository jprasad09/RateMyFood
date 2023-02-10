const Review = require('../models/reviewModel')
const mongoose = require('mongoose')

// get all reviews
const getReviews = async (req, res) => {
  const reviews = await Review.find({}).sort({createdAt: -1})

  res.status(200).json(reviews)
}

// get a single review
const getReview = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such review'})
  }

  const review = await Review.findById(id)

  if (!review) {
    return res.status(404).json({error: 'No such review'})
  }

  res.status(200).json(review)
}

// create a new review
const createReview = async (req, res) => {
  const {user_id, restaurant_id, review, images, rating} = req.body

  let emptyFields = []

  if (!user_id) {
    emptyFields.push('user_id')
  }
  if (!restaurant_id) {
    emptyFields.push('restaurant_id')
  }
  if (!review) {
    emptyFields.push('review')
  }
  if (!rating) {
    emptyFields.push('rating')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const reviewRes = await Review.create({ user_id, restaurant_id, review, images, rating })
    res.status(200).json(reviewRes)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such review'})
  }

  const review = await Review.findOneAndDelete({_id: id})

  if(!review) {
    return res.status(400).json({error: 'No such review'})
  }

  res.status(200).json(review)
}

// update a review
const updateReview = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such review'})
  }

  const review = await Review.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!review) {
    return res.status(400).json({error: 'No such review'})
  }

  res.status(200).json(review)
}

module.exports = {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview
}