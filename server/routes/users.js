const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const { search } = req.query;
  const users = await User.find({ username: new RegExp(search, 'i') }).select('username');
  res.json(users);
});

module.exports = router;