const express = require('express')
const {
  getComments,
  getComment,
  createComment,
  deleteComment,
  updateComment
} = require('../controllers/commentController')

const router = express.Router()

// GET all comments
router.get('/', getComments)

// GET a single comment
router.get('/:id', getComment)

// POST a new comment
router.post('/', createComment)

// DELETE a comment
router.delete('/:id', deleteComment)

// UPDATE a comment
router.patch('/:id', updateComment)

module.exports = router