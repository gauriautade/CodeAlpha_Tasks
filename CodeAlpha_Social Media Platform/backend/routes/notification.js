const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// GET notifications
router.get("/:userId", async (req, res) => {
  const notes = await Notification.find({ userId: req.params.userId })
    .populate("fromUser", "username profilePic")
    .sort({ createdAt: -1 });
  res.json(notes);
});

// MARK ALL READ
router.post("/:userId/read", async (req, res) => {
  await Notification.updateMany(
    { userId: req.params.userId },
    { read: true }
  );
  res.json({ success: true });
});

module.exports = router;
