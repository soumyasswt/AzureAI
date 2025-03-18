// backend/routes/profileRoute.js (Express Route)
const express = require('express');
const jwt = require('jsonwebtoken'); // JWT for token verification
const User = require('../models/User.js'); // Assuming you have a User model
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await User.findById(decoded.userId); // Find the user by the ID in the token

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ name: user.name, email: user.email, role: user.role });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
