const Restaurant = require('../models/restaurantModel')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// get all restaurants
const getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find({}).sort({createdAt: -1})

  res.status(200).json(restaurants)
}

// get a single restaurant
const getRestaurant = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such restaurant'})
  }

  const restaurant = await Restaurant.findById(id)

  if (!restaurant) {
    return res.status(404).json({error: 'No such restaurant'})
  }

  res.status(200).json(restaurant)
}

// create a new restaurant
const createRestaurant = async (req, res) => {
  const {email, password, name, phone_no, address, images, cuisine} = req.body

  let emptyFields = []

  if (!email) {
    emptyFields.push('email')
  }
  if (!password) {
    emptyFields.push('password')
  }
  if (!name) {
    emptyFields.push('name')
  }
  if (!phone_no) {
    emptyFields.push('phone_no')
  }
  if (!address) {
    emptyFields.push('address')
  }
  // if (!images) {
  //   emptyFields.push('images')
  // }
  // if (!cuisine) {
  //   emptyFields.push('cuisine')
  // }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const restaurantExist = await Restaurant.findOne({ email: email })
    if(restaurantExist){
        return res.status(422).json({ error: "Email already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

    const restaurant = await Restaurant.create({ email, password:hashPass, name, phone_no, address, images, cuisine })
    res.status(200).json(restaurant)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a restaurant
const deleteRestaurant = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such restaurant'})
  }

  const restaurant = await Restaurant.findOneAndDelete({_id: id})

  if(!restaurant) {
    return res.status(400).json({error: 'No such restaurant'})
  }

  res.status(200).json(restaurant)
}

// update a restaurant
const updateRestaurant = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such restaurant'})
  }

  const restaurant = await Restaurant.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!restaurant) {
    return res.status(400).json({error: 'No such restaurant'})
  }

  res.status(200).json(restaurant)
}

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant
}