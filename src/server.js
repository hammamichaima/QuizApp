const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Enable CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Define API route
app.get("/quiz", async (req, res) => {
  console.log("📥 Received request at /quiz");
  try {
    const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
    console.log("✅ Quiz data fetched:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching quiz data:", error);
    res.status(500).json({ message: "Failed to fetch quiz data" });
  }
});

// Start the server
const PORT = 5002;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
