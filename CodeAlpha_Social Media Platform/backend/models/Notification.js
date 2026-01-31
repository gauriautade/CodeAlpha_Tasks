const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },   // receiver
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // sender
  type: { type: String }, // "like" | "follow"
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", default: null },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", NotificationSchema);
