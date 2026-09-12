const express = require("express");

const Comment = require("../models/Comment");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Get comments for a reel
router.get("/:reelId", async (req, res) => {
  const comments = await Comment.find({
    reel: req.params.reelId,
  })
    .populate("user", "name")
    .sort({ createdAt: 1 });

  res.json(comments);
});

// Add comment
router.post(
  "/:reelId",
  auth,
  async (req, res) => {
    const comment = await Comment.create({
      reel: req.params.reelId,
      user: req.user._id,
      text: req.body.text,
    });

    res.status(201).json(comment);
  }
);

module.exports = router;