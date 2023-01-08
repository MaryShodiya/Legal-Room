const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const postsController = require('../controllers/posts')
const questionsController = require('../controllers/questions')
const commentsController = require('../controllers/comments')
const { ensureAuth, ensureGuest } = require('../middleware/auth')





router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, questionsController.getProfile);
router.get("/login", authController.getLogin);
router.get("/ask", questionsController.askQuestion)
router.get("/writeComment", commentsController.writeComment)
router.get("/editprofile", questionsController.editProfile)
router.get("/questions", questionsController.getQuestions)
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.post("/login", authController.postLogin)




module.exports = router;