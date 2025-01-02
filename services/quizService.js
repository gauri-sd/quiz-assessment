const { v4: uuidv4 } = require("uuid");

const quizzes = {};
const results = {};

exports.createQuiz = ({ title, questions }) => {
  if (!title || !Array.isArray(questions) || questions.length === 0) {
    throw new Error("Invalid quiz data");
  }

  const quizId = uuidv4();
  quizzes[quizId] = {
    id: quizId,
    title,
    questions: questions.map((q) => ({
      id: uuidv4(),
      text: q.text,
      options: q.options,
      correct_option: q.correct_option,
    })),
  };

  return { message: "Quiz created", quizId };
};

exports.getQuiz = (quizId) => {
  const quiz = quizzes[quizId];
  if (!quiz) return null;

  return {
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions.map((q) => ({
      id: q.id,
      text: q.text,
      options: q.options,
    })),
  };
};

exports.submitAnswer = (quizId, questionId, { userId, selected_option }) => {
  if (!userId || selected_option === undefined) {
    throw new Error("Invalid input");
  }

  const quiz = quizzes[quizId];
  if (!quiz) throw new Error("Quiz not found");

  const question = quiz.questions.find((q) => q.id === questionId);
  if (!question) throw new Error("Question not found");

  const isCorrect = question.correct_option === selected_option;

  if (!results[userId]) results[userId] = {};
  if (!results[userId][quizId]) results[userId][quizId] = [];

  const existingAnswerIndex = results[userId][quizId].findIndex(
    (answer) => answer.question_id === questionId
  );

  if (existingAnswerIndex !== -1) {
    results[userId][quizId][existingAnswerIndex] = {
      question_id: questionId,
      selected_option,
      is_correct: isCorrect,
    };
  } else {
    results[userId][quizId].push({
      question_id: questionId,
      selected_option,
      is_correct: isCorrect,
    });
  }

  return {
    correct: isCorrect,
    correct_option: isCorrect ? undefined : question.correct_option,
  };
};

exports.getResults = (quizId, userId) => {
  if (!results[userId] || !results[userId][quizId]) return null;

  const userResults = results[userId][quizId];
  const score = userResults.filter((r) => r.is_correct).length;

  return { quiz_id: quizId, user_id: userId, score, answers: userResults };
};
