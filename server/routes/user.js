const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require('../controllers/UserController')

const router = express.Router()

// GET all users
router.get('/', getUsers)

// GET a single user
router.get('/:id', getUser)

// POST a new user
router.post('/', upload.single('profileImage'), createUser)

// DELETE a user
router.delete('/:id', deleteUser)

// UPDATE a user
router.patch('/:id', updateUser)

module.exports = router