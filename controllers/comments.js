const Comment = require("../models/Comment");
const cloudinary = require("../middleware/cloudinary");

module.exports = {

  createComment: async (req, res) => {
    try {
     const result = await cloudinary.uploader.upload(req.file.path);
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user,
        profileImg: result.secure_url
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
