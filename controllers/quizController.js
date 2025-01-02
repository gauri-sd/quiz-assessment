const quizService = require("../services/quizService");

exports.createQuiz = (req, res) => {
  try {
    const quiz = quizService.createQuiz(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuiz = (req, res) => {
  try {
    const quiz = quizService.getQuiz(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitAnswer = (req, res) => {
  try {
    const feedback = quizService.submitAnswer(
      req.params.quizId,
      req.params.questionId,
      req.body
    );
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResults = (req, res) => {
  try {
    const results = quizService.getResults(
      req.params.quizId,
      req.params.userId
    );
    if (!results) {
      return res.status(404).json({ error: "Results not found" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};