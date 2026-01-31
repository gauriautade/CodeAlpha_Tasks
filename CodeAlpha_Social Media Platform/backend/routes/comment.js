const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  const { postId, userId, text } = req.body;
  if (!text) return res.json({ error: "Empty comment" });

  const comment = new Comment({ postId, userId, text });
  await comment.save();
  res.json(comment);
});

router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId })
    .populate("userId", "username")
    .sort({ createdAt: 1 });

  res.json(comments);
});

module.exports = router;
