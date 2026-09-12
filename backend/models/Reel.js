const mongoose = require("mongoose");

const reelSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    category: String,

    video: String,

    price: Number,

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Reel",
  reelSchema
);