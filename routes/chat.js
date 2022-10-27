const express = require('express')
const router = express.Router()
const chatRoomController = require('../controllers/chatroom')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//router.get('/chatroom', ensureAuth, chatRoomController.getChatRoom)

module.exports = router;