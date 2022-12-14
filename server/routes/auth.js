const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass
    })

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("Wrong credentials");

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(401).json("Wrong credentials");

    const { password, ...rest } = user._doc;
    
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})





module.exports = router;

