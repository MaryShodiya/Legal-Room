const mongoose = require("mongoose");


const subCommentSchema = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  subcomment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    ref: "User"
  },
  likes: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model("SubComment", subCommentSchema);
