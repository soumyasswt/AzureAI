const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Import your User model
const authenticateToken = require('./middleware/authenticateToken'); // Middleware to authenticate token

const router = express.Router();

// PUT route to update user profile
router.put('/api/users/update', authenticateToken, async (req, res) => {
    const { name, email } = req.body;

    try {
        // Find the user by ID (the ID is stored in the token)
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;

        // Save the updated user
        await user.save();

        // Return the updated user
        res.json(user);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
