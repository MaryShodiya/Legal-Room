const Comment = require("../models/Comment");
const Question = require("../models/Question");
const Profile = require("../models/Profile");
const SubComment = require("../models/SubComment");


module.exports = {


  writeComment:  async (req, res) => {
    try{
      const profile = await Profile.findOne({ user: req.user.id })
    res.render('comment.ejs', { profile: profile })
    } catch (err) {
      console.log(err)
    }
    },

  createComment: async (req, res) => {
    try {
     
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        question: req.params.id,
        createdBy: req.user.userName,
      });
      console.log("Comment has been added!");
      res.redirect("/question/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
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

  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.id })
      console.log("comment removed")
      res.redirect("/question/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },


}