const express = require("express");
const Blog = require("../models/Blog");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.post("/", async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      status
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Blog title is required"
      });
    }

    const blog = await Blog.create({
      title: title.trim(),
      content: content || "",
      excerpt: excerpt || "",
      category: category || "General",
      status: status === "published"
        ? "published"
        : "draft",
      author: req.user._id
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create blog"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user._id
    }).sort({
      createdAt: -1
    });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blogs"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      author: req.user._id
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch blog"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user._id
      },
      {
        title: req.body.title,
        content: req.body.content,
        excerpt: req.body.excerpt,
        category: req.body.category,
        status: req.body.status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update blog"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.json({
      message: "Blog deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete blog"
    });
  }
});

module.exports = router;
