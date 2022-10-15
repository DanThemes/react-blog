const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/Article');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config()

AWS.config.update({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3({signatureVersion: 'v4'})

// Get pre-signed upload URL
router.post('/', async (req, res) => {
  
  // TODO: use a random unique name instead
  const fileName = `react-blog/${req.body.fileName}`;
  const fullFileName = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/react-blog/${req.body.fileName}`;
  
  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Expires: 60 * 60,
    ContentType: 'image/*'
  };

  try {
    const url = await s3.getSignedUrlPromise('putObject', s3Params);
    res.status(200).json({ fullFileName, fileName, url });
  } catch (err) {
    res.status(400).json(err);
  }
})

// Get pre-signed delete URL
router.delete('/:id', async (req, res) => {

  if( !mongoose.Types.ObjectId.isValid(req.params.id) ) {
    return res.status(400).json("Invalid article URL.")
  }
  const article = await Article.findById(req.params.id)
  
  // TODO: use a random unique name instead
  const fileName = article.image.substring(article.image.indexOf('amazonaws.com/') + 14);
    console.log('fileName')
    console.log(fileName)

  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName
  };

  try {
    await s3.deleteObject(s3Params, (err, data) => {
      // if (err) return console.log(err)
      // console.log(data);
      // if (err) {
      //   return res.status(400).json(err);
      // }
      // res.status(204).json(data);
      // res.sendStatus(200).json('Image deleted');
      res.send()
    }).promise();
  } catch (err) {
    res.status(400).json(err);
  }
  
})

module.exports = router;