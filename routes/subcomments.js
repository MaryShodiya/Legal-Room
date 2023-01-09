const express = require("express");
const router = express.Router();
const subcommentsController = require("../controllers/subcomments");
const { ensureAuth, ensureGuest } = require("../middleware/auth")


router.post("/createSubCommment", subcommentsController.createSubCommment);
router.put("/likeSubComment/:id", subcommentsController.likeSubComment);
router.delete("/deleteSubComment/:id", subcommentsController.deleteSubComment);


module.exports = router;