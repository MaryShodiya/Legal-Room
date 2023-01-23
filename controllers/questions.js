const cloudinary = require("../middleware/cloudinary");
const Question = require("../models/Question");
const Profile = require("../models/Profile");
const Comment = require("../models/Comment");
const SubComment = require("../models/SubComment");
const moments = require("../controllers/moment")



module.exports = {


askQuestion:  (req, res) => {
  res.render('ask.ejs')
},




editProfile:  async (req, res) => {
try{
  const profile = await Profile.findOne({ user: req.user.id })
res.render('editprofile.ejs', { profile: profile })
} catch (err) {
  console.log(err)
}
},


getProfile: async (req, res) => {
  try {
    const questions = await Question.find({ user: req.user.id });
    const profile = await Profile.findOne({ user: req.user.id  });

    res.render("profile.ejs", {  questions: questions, user: req.user,  profile: profile, moments });
  } catch (err) {
    console.log(err);
  }
},



  getQuestions: async (req, res) => {
    try {
      const questions = await Question.find().sort({ createdAt: "desc" }).lean();
  
      console.log(questions)
      res.render("question.ejs", { questions: questions, user: req.user, moments:moments});
    } catch (err) {
      console.log(err);
    }
  },

  getQuestion: async (req, res) => {
    
    try {
    


      const question = await Question.findById(req.params.id)
      const comments= await Comment.find({question:req.params.id}).sort({createdAt:"asc"}).lean()
      const subcomment = await SubComment.find({comments:req.params.id}).sort({createdAt:"desc"}).lean()
      const profile = await Profile.findOne({ user: req.user.id  });
      res.render("post.ejs", { question: question, user: req.user, profile: profile , comments:comments, subcomment:subcomment, moments});
      
    } catch (err) {
      console.log(err);
    }
  },

 
   

  addQuestion: async (req, res) => {
    try {
      // Upload image to cloudinary

      
      if (req.file !==  undefined) {
        const result = await cloudinary.uploader.upload(req.file.path)
      
      await Question.create({
        title: req.body.title,
       image: result.secure_url,
        cloudinaryId: result.public_id,
        question_body: req.body.question_body,
        likes: 0,
        userName: req.user.userName,
        user: req.user.id,
        createdAt:result.createdAt
      
      });
    } else{ const result =  String;
      await Question.create({
        title: req.body.title,
       image: result.secure_url,
        cloudinaryId: result.public_id,
        question_body: req.body.question_body,
        likes: 0,
        userName: req.user.userName,
        user: req.user.id,
        createdAt: result.createdAt
      
      });
    
    }
    
      console.log("Question has been added!");
      res.redirect("/profile");
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
      res.redirect(`/question/${req.params.id}`)
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
      if (question.cloudinaryId != String) {
        await cloudinary.uploader.destroy(question.cloudinaryId);
      }
      console.log("Deleted Question");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};