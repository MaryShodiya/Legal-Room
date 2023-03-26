const Comment = require("../models/Comment");
const Question = require("../models/Question");
const Profile = require("../models/Profile");
const SubComment = require("../models/SubComment");
const moment = require("moment")


module.exports = {


  writeComment:  async (req, res) => {
    try{
      const comment = await Comment.findById(req.params.id)
      const profile = await Profile.findOne({ user: req.user.id })
      const commentdate = new Date(comment.createdAt)
      const formattedDateComment = moment(commentdate).fromNow()
      
    res.render('comment.ejs', { profile: profile,  comment, formattedDateComment })
    } catch (err) {
      console.log(err)
    }
    },

  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        commentNo: 0,
        question: req.params.id,
        createdBy: req.user.userName,
        createdByUserImage: req.profile.profileImage,
        createdAt: req.params.createdAt
      },
      {
        $inc: { commentNo: 1 },
      }
      );
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