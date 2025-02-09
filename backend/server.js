import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

pool
  .connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch((err) => console.log("Error connecting to PostgreSQL:", err));

// Sample API Route to get data from DB
app.get("/api/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM your_table");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).send("Server Error");
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
