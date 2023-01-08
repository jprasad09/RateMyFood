const express = require('express')
const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant
} = require('../controllers/restaurantController')

const router = express.Router()

// GET all restaurants
router.get('/', getRestaurants)

// GET a single restaurant
router.get('/:id', getRestaurant)

// POST a new restaurant
router.post('/', createRestaurant)

// DELETE a restaurant
router.delete('/:id', deleteRestaurant)

// UPDATE a restaurant
router.patch('/:id', updateRestaurant)

module.exports = router