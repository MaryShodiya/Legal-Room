const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  commentNo: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: String,
    ref: "User"
  },
  createdById: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile", 
  }
});


module.exports = mongoose.model("Comment", CommentSchema);

