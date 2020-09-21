const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('post', postSchema);
