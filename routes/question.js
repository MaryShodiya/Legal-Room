const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const questionsController = require("../controllers/questions");
const { ensureAuth, ensureGuest } = require("../middleware/auth");




router.get("/:id", ensureAuth, questionsController.getQuestion)


router.post("/addQuestion", upload.single("file"), questionsController.addQuestion);


router.put("/addOneLike/:id", questionsController.addOneLike);

router.delete("/deleteQuestion/:id", questionsController.deleteQuestion);



module.exports = router;