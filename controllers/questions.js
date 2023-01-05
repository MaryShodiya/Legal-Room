
const cloudinary = require("../middleware/cloudinary");
const Question = require("../models/Question");
const Profile = require("../models/Profile");



module.exports = {

  askQuestion: async (req, res) => {
    try {
      const questions = await Question.find({ user: req.user.id });
      res.render("ask.ejs", { questions: questions, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getQuestions: async (req, res) => {
    try {
      const questions = await Question.find().sort({ createdAt: "desc" }).lean();
      res.render("question.ejs", { questions: questions, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getQuestion: async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      const profile = await Question.find().populate('name', 'profileImage')
      res.render("question.ejs", { question: question, user: req.user, profile});
      console.log(profile)
    } catch (err) {
      console.log(err);
    }
  },
   

  addQuestion: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Question.create({
        title: req.body.title,
       image: result.secure_url,
        cloudinaryId: result.public_id,
        question_body: req.body.question_body,
        likes: 0,
        user: req.user.id,
      });
      console.log("Question has been added!");
      res.redirect("/questions");
    } catch (err) {
      console.log(err);
    }
  },

  addOneLike: async (req, res) => {
    try {
      await Question.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect("/questions")
    } catch (err) {
      console.log(err);
    }
  },
  
  deleteQuestion: async (req, res) => {
    try {
     
      let question = await Question.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(question.cloudinaryId);
      // Delete post from db
      await Question.remove({ _id: req.params.id });
      console.log("Deleted Question");
      res.redirect("/questions");
    } catch (err) {
      res.redirect("/questions");
    }
  },
};