const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    reel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reel",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    text: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Comment",
  commentSchema
);