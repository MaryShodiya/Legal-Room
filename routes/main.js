const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const postsController = require('../controllers/posts')
const questionsController = require('../controllers/questions')
const { ensureAuth, ensureGuest } = require('../middleware/auth')




router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
//router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.get("/ask", questionsController.askQuestion)
//router.get("/makepost", postsController.makePost)
router.get("/editprofile", postsController.editProfile)
router.get("/questions", questionsController.getQuestions)
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.post("/login", authController.postLogin)




module.exports = router;