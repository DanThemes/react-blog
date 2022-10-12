const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Article = require('../models/Article');


// Find All
router.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 })
  res.status(200).json(articles);
})

// Create
router.post('/new', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content
  })

  const savedArticle = await article.save();
  res.status(201).json(savedArticle);
})

// Find One
router.get('/:id', async (req, res) => {
  // console.log(typeof req.params.id)
  if( !mongoose.Types.ObjectId.isValid(req.params.id) ) {
    return res.status(400).json("Invalid article URL.")
  }
  const article = await Article.findById(req.params.id)

  if (!article) return res.status(400).json(err);

  res.status(200).json(article);
})

module.exports = router;