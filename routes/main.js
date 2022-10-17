const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
/*const profileController = require('../controllers/profiles')*/
const postsController = require('../controllers/posts')
const questionsController = require('../controllers/questions')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const upload = require("../middleware/multer");
const { encode } = require('../middleware/jwt')


router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.get("/ask", questionsController.askQuestion)
//router.get("/profile", profileController.getPicture)
router.get("/questions", questionsController.getQuestions)
router.post("/login", authController.postLogin);




/*router.post("/login/:userId", encode, (req, res, next) => {
    return res
    .status(200)
    .json({ 
        success: true,
        authorization: req.authToken
    })
})*/
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.post("/uploadPicture", upload.single("file-to-upload"), authController.uploadPicture); 



module.exports = router