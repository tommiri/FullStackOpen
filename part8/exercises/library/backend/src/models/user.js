const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: [3, 'Favorite genre must be at least 3 characters long'],
  },
})

module.exports = mongoose.model('User', schema)
