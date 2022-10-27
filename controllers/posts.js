const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Profile = require("../models/Profile"); 






module.exports = {

makePost:  (req, res) => {
    res.render('postform.ejs')
},

editProfile:  (req, res) => {
  res.render('editprofile.ejs', )
},

/*getChatroom: async (req, res, next) => {
  try{
  const chats = await Chat.findById(req.params.id);
  const profile = await Profile.findById(req.params.id)
  res.render('chatroom.ejs', {
    chats: chats, 
    user: req.user, 
    profile: profile,
  });
  res.io.emit('is_online', `${req.user} has joined the chat`)
  } catch (err) {
    console.log(err);
  }
},*/



getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const profile = await Profile.findOne({ user: req.user.id });

      res.render("profile.ejs", { 
        posts: posts, 
        user: req.user, 
        profile: profile });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  /*postChatMessage: async (req, res) => {
    try{
     await Chat.create({
       message: req.body.message,
       user: req.user.id,
     });
     console.log (" A Message was sent");
     res.redirect ("/messages");
     console.log(req.body.message)
    } catch (err) {
      console.log(err);
    }
  },*/
 
  postEditProfile: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Profile.create({
        profileImage: result.secure_url,
        cloudinaryId: result.public_id,
        name: req.body.name,
        location: req.body.location,
        user: req.user.id,
        work: req.body.work,
        hobbies: req.body.hobbies,
        skills: req.body.skills,
        user:req.user.id,

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
   
};
