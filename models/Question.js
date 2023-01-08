const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: false
  
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  question_body: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  userName: {
     type: String,
     ref: "User",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
