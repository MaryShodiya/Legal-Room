const cloudinary = require("../middleware/cloudinary");
const Question = require("../models/Question");
const Profile = require("../models/Profile");
const Comment = require("../models/Comment");
const subComment = require("../models/SubComment");


module.exports = {
    likeSubComment: async (req, res) => {
        try {
          await subComment.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
            }
          );
          console.log("Likes +1");
          res.redirect(`/question/${req.params.id}`)
        } catch (err) {
          console.log(err);
        }
      },
    
      deleteSubComment: async (req, res) => {
        try {
          await subComment.deleteOne({ _id: req.params.id })
          console.log("comment removed")
          res.redirect("/question/"+req.params.id);
        } catch (err) {
          console.log(err);
        }
      },
    
    
      createSubCommment: async (req, res) => {
        try {
          await subComment.create({
            subcomment: req.body.subcomment,
            likes: 0,
            comment: req.params.id,
            createdBy: req.user.userName,
          })
          console.log("A subcomment has been added!");
          res.redirect("/question/"+req.params.id);
        } catch (err) {
          console.log(err);
        } 
      }

}