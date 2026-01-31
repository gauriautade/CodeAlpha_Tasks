const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400   // auto delete after 24 hours
  }
});

module.exports = mongoose.model("Story", StorySchema);
