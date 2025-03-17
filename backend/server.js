import express from "express";
import mysql from "mysql2";
import cors from "cors";
import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json()); // Allows JSON data in requests

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: true },
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Error:", err);
  } else {
    console.log("✅ Database connected successfully!");
  }
});

// Sample Route - Get All Users (Modify table name accordingly)
// ✅ 1. Get all users
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } 
    catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ 2. Add a new user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await pool.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    res.json({ message: "User added!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ 3. Update a user
app.put("/users/:id", async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  try {
    await pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
    res.json({ message: "User updated!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ 4. Delete a user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});

app.use(express.json());
