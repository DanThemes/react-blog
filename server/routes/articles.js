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
    image: req.body.image,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
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

  if (!article) return res.status(404).json("Article not found");

  res.status(200).json(article);
})

// Update
router.put('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (!article) return res.status(400).json(err);

  const filter = { _id: req.params.id }
  const newValues = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  }
  if (req.body.image) {
    newValues.image = req.body.image
  }

  const updatedArticle = await Article.updateOne(filter, newValues);
  res.status(201).json(updatedArticle);
})

// Delete
router.delete('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(400).json('Article not found');

  await Article.deleteOne({ _id: article._id });
  res.status(204).json('Article deleted.')
})

module.exports = router;