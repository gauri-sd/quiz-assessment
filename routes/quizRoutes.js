const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.post("/", quizController.createQuiz);
router.get("/:id", quizController.getQuiz);
router.post("/:quizId/questions/:questionId/answer", quizController.submitAnswer);
router.get("/:quizId/results/:userId", quizController.getResults);

module.exports = router;