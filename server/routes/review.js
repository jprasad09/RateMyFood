const express = require('express')
const {
  getReviews,
  getReview,
  getReviewsByRestaurantId,
  createReview,
  deleteReview,
  updateReview
} = require('../controllers/reviewController')

const router = express.Router()

// GET reviews by restaurant ID
router.get('/restaurant/:id', getReviewsByRestaurantId)

// GET all reviews
router.get('/', getReviews)

// GET a single review
router.get('/:id', getReview)

// POST a new review
router.post('/', createReview)

// DELETE a review
router.delete('/:id', deleteReview)

// UPDATE a review
router.patch('/:id', updateReview)

module.exports = router