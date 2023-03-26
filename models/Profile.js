const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
 
  work: {
    type: String,
    required: true,
  },
  hobbies: {
    type: String,
    required: true
  },
  cloudinaryId: {
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
  fullName: {
    type: String,
    ref: "User",
  },
  userName: {
    type: String,
     ref: "User",
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  profilePicture: {
    type: String,
    required: true
  }
});



module.exports = mongoose.model("Profile", ProfileSchema);



