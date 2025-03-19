const express = require('express');
const app = express();
const verifyToken = require('./verifyToken');  // Import the middleware
const User = require('./models/User');  // Import the User model

app.use(express.json());  // Ensure JSON body parsing

// Route to update profile, protected by token verification
app.put('/api/updateProfile', verifyToken, async (req, res) => {
  const userId = req.user?.id;  // Ensure req.user exists
  const { name, email } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ message: 'Name and Email cannot be empty' });
  }

  try {
    // Update the user profile in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }  // Ensures updated values are valid
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
});
