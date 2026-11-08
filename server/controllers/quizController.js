
const mongoose = require('mongoose')
const { quizzes } = require('../data/data')
const Question = require('../models/Question')
const QuizAttempt = require('../models/QuizAttempt')

// GET /api/quizzes
// Get all subjects with live question counts from MongoDB.
const getAllQuizzes = async (req, res) => {
  try {
    const subjects = await Promise.all(
      quizzes.map(async (quiz) => ({
        id: quiz.id,
        subject: quiz.subject,
        description: quiz.description,
        questionCount: await Question.countDocuments({
          subjectId: quiz.id
        })
      }))
    )

    res.status(200).json({
      success: true,
      count: subjects.length,
      quizzes: subjects
    })
  } catch (error) {
    console.error('Quiz retrieval error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve quizzes'
    })
  }
}

// GET /api/quizzes/:subject
// Get questions directly from MongoDB.
const getQuizBySubject = async (req, res) => {
  try {
    const subjectId = req.params.subject.toLowerCase()
    const quiz = quizzes.find((item) => item.id === subjectId)

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz subject not found'
      })
    }

    const databaseQuestions = await Question.find({
      subjectId
    })
      .sort({ questionId: 1 })
      .lean()

    const questions = databaseQuestions.map((item) => ({
      id: item.questionId,
      question: item.question,
      options: item.options
    }))

    res.status(200).json({
      success: true,
      subject: quiz.subject,
      description: quiz.description,
      count: questions.length,
      questions
    })
  } catch (error) {
    console.error('Quiz questions error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve quiz questions'
    })
  }
}

// POST /api/quizzes/:subject/submit
// Evaluate answers using the MongoDB question bank.
const submitQuiz = async (req, res) => {
  try {
    const subjectId = req.params.subject.toLowerCase()
    const { answers } = req.body

    const quiz = quizzes.find((item) => item.id === subjectId)

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz subject not found'
      })
    }

    const questions = await Question.find({
      subjectId
    })
      .sort({ questionId: 1 })
      .lean()

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No questions available for this subject'
      })
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please submit your answers'
      })
    }

    if (answers.length !== questions.length) {
      return res.status(400).json({
        success: false,
        message: `Please answer all ${questions.length} questions`
      })
    }

    const questionIds = new Set()
    const results = []
    let score = 0

    for (const item of answers) {
      if (
        !item ||
        !Number.isInteger(item.questionId) ||
        typeof item.answer !== 'string'
      ) {
        return res.status(400).json({
          success: false,
          message: 'Each answer needs a numeric questionId and a string answer'
        })
      }

      if (questionIds.has(item.questionId)) {
        return res.status(400).json({
          success: false,
          message: 'Duplicate question IDs are not allowed'
        })
      }

      questionIds.add(item.questionId)

      const question = questions.find(
        (q) => q.questionId === item.questionId
      )

      if (!question) {
        return res.status(400).json({
          success: false,
          message: `Invalid question ID: ${item.questionId}`
        })
      }

      const isCorrect = item.answer === question.answer

      if (isCorrect) {
        score++
      }

      results.push({
        questionId: question.questionId,
        question: question.question,
        selectedAnswer: item.answer,
        correct: isCorrect,
        correctAnswer: question.answer,
        explanation: question.explanation || ''
      })
    }

    const percentage = Math.round(
      (score / questions.length) * 100
    )

    const attempt = await QuizAttempt.create({
      user: req.user._id,
      subjectId: quiz.id,
      subject: quiz.subject,
      score,
      totalQuestions: questions.length,
      percentage,
      results
    })

    res.status(200).json({
      success: true,
      message: 'Quiz submitted and attempt saved successfully',
      attemptId: attempt._id,
      createdAt: attempt.createdAt,
      subject: quiz.subject,
      totalQuestions: questions.length,
      totalAnswered: answers.length,
      score,
      percentage,
      results
    })
  } catch (error) {
    console.error('Quiz submission error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to submit and save quiz attempt'
    })
  }
}

// GET /api/quizzes/history
// Get only the logged-in student's attempts.
const getMyAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({
      user: req.user._id
    })
      .select('-results')
      .sort({ createdAt: -1 })
      .lean()

    const totalAttempts = attempts.length

    const averageScore = totalAttempts
      ? Math.round(
          attempts.reduce((sum, item) => sum + item.percentage, 0) /
          totalAttempts
        )
      : 0

    const bestScore = totalAttempts
      ? Math.max(...attempts.map((item) => item.percentage))
      : 0

    res.status(200).json({
      success: true,
      totalAttempts,
      averageScore,
      bestScore,
      attempts
    })
  } catch (error) {
    console.error('Quiz history error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve quiz history'
    })
  }
}

// GET /api/quizzes/history/:attemptId
// Get details of one attempt belonging to the logged-in student.
const getAttemptDetails = async (req, res) => {
  try {
    const { attemptId } = req.params

    if (!mongoose.Types.ObjectId.isValid(attemptId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid attempt ID'
      })
    }

    const attempt = await QuizAttempt.findOne({
      _id: attemptId,
      user: req.user._id
    }).lean()

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      })
    }

    res.status(200).json({
      success: true,
      attempt
    })
  } catch (error) {
    console.error('Attempt details error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve attempt details'
    })
  }
}

module.exports = {
  getAllQuizzes,
  getQuizBySubject,
  submitQuiz,
  getMyAttempts,
  getAttemptDetails
}
