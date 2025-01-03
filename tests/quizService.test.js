const quizService = require("../services/quizService");

describe("Quiz Service", () => {
  test("should create a new quiz", () => {
    const quiz = quizService.createQuiz({
      title: "Sample Quiz",
      questions: [
        {
          text: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correct_option: 1,
        },
      ],
    });

    expect(quiz).toHaveProperty("quizId");
  });

  test("should fetch a quiz by ID", () => {
    const quizData = {
      title: "Sample Quiz",
      questions: [
        {
          text: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correct_option: 1,
        },
      ],
    };
    const quiz = quizService.createQuiz(quizData);
    const fetchedQuiz = quizService.getQuiz(quiz.quizId);

    expect(fetchedQuiz.title).toBe(quizData.title);
  });

  test("should submit an answer and return feedback", () => {
    const quiz = quizService.createQuiz({
      title: "Sample Quiz",
      questions: [
        {
          text: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correct_option: 1,
        },
      ],
    });

    const fetchedQuiz = quizService.getQuiz(quiz.quizId);

    const feedback = quizService.submitAnswer(
      quiz.quizId,
      fetchedQuiz.questions[0].id,
      { userId: "user123", selected_option: 1 }
    );

    expect(feedback.correct).toBe(true);
  });

  test("should get results for a user", () => {
    const quiz = quizService.createQuiz({
      title: "Sample Quiz",
      questions: [
        {
          text: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correct_option: 1,
        },
      ],
    });

    const fetchedQuiz = quizService.getQuiz(quiz.quizId);

    quizService.submitAnswer(quiz.quizId, fetchedQuiz.questions[0].id, {
      userId: "user123",
      selected_option: 1,
    });

    const results = quizService.getResults(quiz.quizId, "user123");
    expect(results.score).toBe(1);
  });
});