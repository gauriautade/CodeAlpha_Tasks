const express = require("express");
const router = express.Router();
const Story = require("../models/Story");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  const story = new Story({
    userId: req.body.userId,
    image: req.file.filename
  });
  await story.save();
  res.json({ success: true });
});

router.get("/", async (req, res) => {
  const stories = await Story.find()
    .populate("userId", "username profilePic")
    .sort({ createdAt: -1 });

  res.json(stories);
});

module.exports = router;
