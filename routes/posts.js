const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/postEditProfile", upload.single("file"), postsController.postEditProfile)

router.post ("/updateProfile", upload.single("file"), postsController.updateProfile )
 



module.exports = router;