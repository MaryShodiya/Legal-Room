const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Profile = require("../models/Profile"); 
const Comment = require("../models/Comment");
const User = require("../models/User");
const { type } = require("os");





module.exports = {

makePost:  (req, res) => {
    res.render('postform.ejs')
},

/*editProfile:  async (req, res) => {
  try{
    const profile = await Profile.findOne({ user: req.user.id })
  res.render('editprofile.ejs', { profile: profile })
  } catch (err) {
    console.log(err)
  }
},*/


getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const profile = await Profile.findOne({ user: req.user.id  });

      res.render("profile.ejs", {  posts: posts, user: req.user,  profile: profile });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
    
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      /*const profile = await Profile.findOne({ user: req.user.id });
      const comments = await Comment.find().sort({ createdAt: "desc"}).lean();*/
      res.render("feed.ejs", { posts: posts});
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try { 
    const currentUser = await Profile.findOne({ user: req.user.id });
  if (!currentUser) 
    return res.status(404).json({error: 'User not found'});
    if(currentUser){
      const posts = await Post.findById({ user: currentUser.id })
      res.render("post.ejs", { posts: posts, user: currentUser}) 
    }
    } catch (err) {
      console.log(err);
    }
  },

    
    /*try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc"}).lean();
      res.render("post.ejs", { post: post, user:req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },*/

 
  postEditProfile: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Profile.create({
        cloudinaryId: result.public_id,
        profilePicture: result.secure_url,
        location: req.body.location,
        userName: req.user.userName,
        work: req.body.work,
        hobbies: req.body.hobbies,
        skills: req.body.skills,
        fullName:req.user.fullName,
        user: req.user.id

      });
      console.log("Profile has been updated!");
      res.redirect("/profile");
      console.log(result)
    } catch (err) {
      console.log(err);
  }
},

  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        name: req.body.name,
        fullName: req.user.fullName,
        profilePicture: req.user.ProfilePicture

      });
      console.log("Post has been added!");
      res.redirect("/profile");
      console.log(result)
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

  updateProfile : async (req, res) => {
    try{
      
      const result = await cloudinary.uploader.upload(req.file.path)
    await Profile.findOneAndUpdate ({ user: req.user.id },
        {
          cloudinaryId: result.public_id,
          profilePicture: result.secure_url,
          location: req.body.location,
          userName: req.user.userName,
          work: req.body.work,
          hobbies: req.body.hobbies,
          skills: req.body.skills,
          fullName:req.user.fullName,
         })
        console.log("Profile Updated")
        res.redirect("/profile")
    }catch (err){
      console.log(err)
    }
  }
   
};
