const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Login User / Manager
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.role !== role ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(401).json({
        message: "Invalid email, password or role",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;