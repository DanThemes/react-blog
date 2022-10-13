const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  image: {
    type: String,
    required: false,
    default: null
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Object,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);