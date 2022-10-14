const express = require('express');
const router = express.Router();
// const Article = require('../models/Article');
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

  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Expires: 60 * 60,
    ContentType: 'image/*'
  };

  try {
    const url = await s3.getSignedUrlPromise('putObject', s3Params);
    res.status(200).json({ fileName, url });
  } catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;