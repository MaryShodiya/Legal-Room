const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    require: true,
  },
  work: {
    type: String,
    require: true,
  },
  hobbies: {
    type: String,
    require: true
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("Profile", ProfileSchema);



