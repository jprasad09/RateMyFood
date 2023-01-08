const Comment = require('../models/commentModel')
const mongoose = require('mongoose')

// get all comments
const getComments = async (req, res) => {
  const comments = await Comment.find({}).sort({createdAt: -1})

  res.status(200).json(comments)
}

// get a single comment
const getComment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such comment'})
  }

  const comment = await Comment.findById(id)

  if (!comment) {
    return res.status(404).json({error: 'No such comment'})
  }

  res.status(200).json(comment)
}

// create a new comment
const createComment = async (req, res) => {
  const {user_id, comment} = req.body

  let emptyFields = []

  if (!user_id) {
    emptyFields.push('user_id')
  }
  if (!comment) {
    emptyFields.push('comment')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const comment = await Comment.create({ user_id, comment })
    res.status(200).json(comment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such comment'})
  }

  const comment = await Comment.findOneAndDelete({_id: id})

  if(!comment) {
    return res.status(400).json({error: 'No such comment'})
  }

  res.status(200).json(comment)
}

// update a comment
const updateComment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such comment'})
  }

  const comment = await Comment.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!comment) {
    return res.status(400).json({error: 'No such comment'})
  }

  res.status(200).json(comment)
}

module.exports = {
  getComments,
  getComment,
  createComment,
  deleteComment,
  updateComment
}