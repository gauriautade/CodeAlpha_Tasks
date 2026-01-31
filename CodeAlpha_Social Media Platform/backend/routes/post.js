const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require("multer");
const path = require("path");

/* MULTER */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* CREATE POST (TEXT + IMAGE) */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const post = new Post({
      userId: req.body.userId,
      content: req.body.content || "",
      image: req.file ? req.file.filename : ""
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Post failed" });
  }
});

/* GET POSTS */
router.get("/", async (req, res) => {
  const posts = await Post.find()
    .populate("userId", "username profilePic")
    .sort({ createdAt: -1 });

  res.json(posts);
});

/* LIKE */
router.post("/:id/like", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.body.userId)) {
    post.likes.push(req.body.userId);
    await post.save();
  }

  res.json({ success: true });
});

module.exports = router;
