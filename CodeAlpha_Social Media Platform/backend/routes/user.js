const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");
const path = require("path");

/* =========================
   MULTER
   ========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* =========================
   SEARCH USERS  🔥 MUST BE FIRST
   ========================= */
router.get("/search/:query", async (req, res) => {
  const q = req.params.query;

  const users = await User.find({
    username: { $regex: q, $options: "i" }
  }).select("username profilePic");

  res.json(users);
});

/* =========================
   GET USER BY ID
   ========================= */
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("followers following", "username profilePic");

  res.json(user);
});

/* =========================
   UPDATE PROFILE (SELF ONLY)
   ========================= */
router.put("/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    return res.status(403).json({ error: "Not allowed" });
  }

  const updated = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      bio: req.body.bio
    },
    { new: true }
  );

  res.json(updated);
});

/* =========================
   UPLOAD PROFILE PIC (SELF ONLY)
   ========================= */
router.post("/:id/profile-pic", upload.single("image"), async (req, res) => {
  if (req.body.userId !== req.params.id) {
    return res.status(403).json({ error: "Not allowed" });
  }

  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { profilePic: req.file.filename },
    { new: true }
  );

  res.json(updated);
});

/* =========================
   FOLLOW
   ========================= */
router.post("/:id/follow", async (req, res) => {
  const user = await User.findById(req.params.id);
  const me = await User.findById(req.body.userId);

  if (!user.followers.includes(req.body.userId)) {
    user.followers.push(req.body.userId);
    me.following.push(req.params.id);
    await user.save();
    await me.save();
  }

  res.json({ success: true });
});

/* =========================
   UNFOLLOW
   ========================= */
router.post("/:id/unfollow", async (req, res) => {
  const user = await User.findById(req.params.id);
  const me = await User.findById(req.body.userId);

  user.followers = user.followers.filter(
    id => id.toString() !== req.body.userId
  );
  me.following = me.following.filter(
    id => id.toString() !== req.params.id
  );

  await user.save();
  await me.save();

  res.json({ success: true });
});

module.exports = router;
