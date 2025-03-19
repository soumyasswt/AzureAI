const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const sequelize = require('./config/db.js');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Frontend should handle origins
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Test DB connection and sync
sequelize.sync()
  .then(() => console.log('✅ MySQL Database Synced'))
  .catch(err => console.error('❌ Database Sync Error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
