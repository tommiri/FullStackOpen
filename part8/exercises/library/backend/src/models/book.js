const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Book title must be at least 5 characters long'],
  },
  published: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  genres: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => v && v.length > 0,
      message: 'At least one genre is required',
    },
  },
})

module.exports = mongoose.model('Book', schema)
