const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  
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
  
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
