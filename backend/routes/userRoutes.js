const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { authMiddleware, verifyToken } = require("../middleware/authMiddleware");



const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
    res.json({ message: "User profile accessed", user: req.user });
  } catch (error) {
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// 🔹 CREATE a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered!', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// 🔹 LOGIN User (JWT Authentication)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ error: 'Login error: ' + error.message });
  }
});

// 🔹 UPDATE user (Protected Route)
router.put('/:id', verifyToken, async (req, res) => {
  const { name, email } = req.body;
  try {
    await User.update({ name, email }, { where: { id: req.params.id } });
    res.json({ message: 'User updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// 🔹 DELETE user (Protected Route)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

module.exports = router;
