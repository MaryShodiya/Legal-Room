const Comment = require("../models/Comment");
const Question = require("../models/Question");
const Profile = require("../models/Profile");


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
      });
      console.log("Comment has been added!");
      res.redirect("/question/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
