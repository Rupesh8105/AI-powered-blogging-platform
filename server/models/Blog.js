const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    content: {
      type: String,
      default: ""
    },

    excerpt: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      default: "General"
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    },

    views: {
      type: Number,
      default: 0
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Blog", blogSchema);
