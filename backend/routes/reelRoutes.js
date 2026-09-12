const express = require("express");

const Reel = require("../models/Reel");
const {
  auth,
  managerOnly,
} = require("../middleware/auth");

const router = express.Router();

// Get all reels / category-wise reels
router.get("/", async (req, res) => {
  const query =
    req.query.category &&
    req.query.category !== "all"
      ? { category: req.query.category }
      : {};

  const reels = await Reel.find(query).sort({
    createdAt: -1,
  });

  res.json(reels);
});

// Add reel - Manager only
router.post(
  "/",
  auth,
  managerOnly,
  async (req, res) => {
    const reel = await Reel.create(req.body);

    res.status(201).json(reel);
  }
);

// Update reel - Manager only
router.put(
  "/:id",
  auth,
  managerOnly,
  async (req, res) => {
    const reel = await Reel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(reel);
  }
);

// Delete reel - Manager only
router.delete(
  "/:id",
  auth,
  managerOnly,
  async (req, res) => {
    await Reel.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  }
);

// Like / Unlike reel
router.post(
  "/:id/like",
  auth,
  async (req, res) => {
    const reel = await Reel.findById(req.params.id);

    const index = reel.likes.findIndex(
      (id) =>
        id.toString() === req.user._id.toString()
    );

    if (index >= 0) {
      reel.likes.splice(index, 1);
    } else {
      reel.likes.push(req.user._id);
    }

    await reel.save();

    res.json({
      liked: index < 0,
      count: reel.likes.length,
    });
  }
);

module.exports = router;