require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const reelRoutes = require("./routes/reelRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "FoodReel API is running",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/comments", commentRoutes);

// Connect MongoDB and start server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  });