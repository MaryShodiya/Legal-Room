const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const postsController = require('../controllers/posts')
const questionsController = require('../controllers/questions')
const chatRoomController = require('../controllers/chatroom')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
//const { encode } = require('../middleware/jwt')



router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.get("/ask", questionsController.askQuestion)
router.get("/makepost", postsController.makePost)
router.get("/editprofile", postsController.editProfile)
router.get("/questions", questionsController.getQuestions)
router.get('/chatroom', chatRoomController.getChatRoom)
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.post("/login", authController.postLogin)




module.exports = router;