const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const {
  getRestaurantsBySearch,
  getRestaurants,
  getRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant
} = require('../controllers/restaurantController')

const router = express.Router()

// GET restaurants by search
router.post('/search', getRestaurantsBySearch)

// GET all restaurants
router.get('/', getRestaurants)

// GET a single restaurant
router.get('/:id', getRestaurant)

// POST a new restaurant
router.post('/', upload.array('images', 12), createRestaurant)

// DELETE a restaurant
router.delete('/:id', deleteRestaurant)

// UPDATE a restaurant
router.patch('/:id', updateRestaurant)

module.exports = router