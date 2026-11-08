
const User = require('../models/User')
const QuizAttempt = require('../models/QuizAttempt')
const Question = require('../models/Question')
const { quizzes } = require('../data/data')

// Find and validate a subject
const findSubject = (subjectId) => {
  return quizzes.find(
    (quiz) => quiz.id === subjectId.toLowerCase()
  )
}

// Validate question data
const validateQuestionData = (question, options, answer) => {
  if (!question || typeof question !== 'string' || !question.trim()) {
    return 'Question text is required'
  }

  if (
    !Array.isArray(options) ||
    options.length !== 4 ||
    options.some(
      (option) => typeof option !== 'string' || !option.trim()
    )
  ) {
    return 'Exactly four non-empty options are required'
  }

  if (
    !answer ||
    typeof answer !== 'string' ||
    !options.includes(answer.trim())
  ) {
    return 'Correct answer must match one of the four options'
  }

  return null
}

// GET /api/admin/analytics
const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalStudents = await User.countDocuments({ role: 'user' })
    const totalAdmins = await User.countDocuments({ role: 'admin' })

    const totalSubjects = quizzes.length
    const totalQuestions = await Question.countDocuments()

    const totalAttempts = await QuizAttempt.countDocuments()

    const overallPerformance = await QuizAttempt.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: '$percentage' },
          highestScore: { $max: '$percentage' }
        }
      }
    ])

    const averageScore = overallPerformance.length
      ? Math.round(overallPerformance[0].averageScore)
      : 0

    const highestScore = overallPerformance.length
      ? overallPerformance[0].highestScore
      : 0

    const subjectPerformance = await QuizAttempt.aggregate([
      {
        $group: {
          _id: {
            subjectId: '$subjectId',
            subject: '$subject'
          },
          attempts: { $sum: 1 },
          averageScore: { $avg: '$percentage' },
          highestScore: { $max: '$percentage' }
        }
      },
      {
        $project: {
          _id: 0,
          subjectId: '$_id.subjectId',
          subject: '$_id.subject',
          attempts: 1,
          averageScore: { $round: ['$averageScore', 0] },
          highestScore: 1
        }
      },
      { $sort: { attempts: -1 } }
    ])

    const recentAttempts = await QuizAttempt.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(8)
      .select('subject score totalQuestions percentage createdAt user')
      .lean()

    res.status(200).json({
      success: true,
      analytics: {
        users: {
          total: totalUsers,
          students: totalStudents,
          admins: totalAdmins
        },
        quizzes: {
          totalSubjects,
          totalQuestions
        },
        performance: {
          totalAttempts,
          averageScore,
          highestScore
        },
        subjectPerformance,
        recentAttempts
      }
    })
  } catch (error) {
    console.error('Admin analytics error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve admin analytics'
    })
  }
}

// GET /api/admin/questions/:subjectId
const getQuestions = async (req, res) => {
  try {
    const subjectId = req.params.subjectId.toLowerCase()
    const subject = findSubject(subjectId)

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      })
    }

    const questions = await Question.find({ subjectId })
      .sort({ questionId: 1 })
      .lean()

    res.status(200).json({
      success: true,
      subject: subject.subject,
      subjectId,
      count: questions.length,
      questions
    })
  } catch (error) {
    console.error('Question retrieval error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve questions'
    })
  }
}

// POST /api/admin/questions/:subjectId
const addQuestion = async (req, res) => {
  try {
    const subjectId = req.params.subjectId.toLowerCase()
    const subject = findSubject(subjectId)

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      })
    }

    const { question, options, answer, explanation } = req.body

    const validationError = validateQuestionData(
      question,
      options,
      answer
    )

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      })
    }

    const lastQuestion = await Question.findOne({ subjectId })
      .sort({ questionId: -1 })

    const nextQuestionId = lastQuestion
      ? lastQuestion.questionId + 1
      : 1

    const newQuestion = await Question.create({
      subjectId,
      questionId: nextQuestionId,
      question: question.trim(),
      options: options.map((option) => option.trim()),
      answer: answer.trim(),
      explanation:
        typeof explanation === 'string' ? explanation.trim() : ''
    })

    res.status(201).json({
      success: true,
      message: 'Question added successfully',
      question: newQuestion
    })
  } catch (error) {
    console.error('Add question error:', error)

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Question ID conflict. Please try again.'
      })
    }

    res.status(500).json({
      success: false,
      message: 'Unable to add question'
    })
  }
}

// PUT /api/admin/questions/:subjectId/:questionId
const updateQuestion = async (req, res) => {
  try {
    const subjectId = req.params.subjectId.toLowerCase()
    const questionId = Number(req.params.questionId)
    const subject = findSubject(subjectId)

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      })
    }

    if (!Number.isInteger(questionId) || questionId < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid question ID'
      })
    }

    const existingQuestion = await Question.findOne({
      subjectId,
      questionId
    })

    if (!existingQuestion) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      })
    }

    // Only update the allowed fields.
    const updatedQuestion = {
      question:
        req.body.question !== undefined
          ? req.body.question
          : existingQuestion.question,

      options:
        req.body.options !== undefined
          ? req.body.options
          : existingQuestion.options,

      answer:
        req.body.answer !== undefined
          ? req.body.answer
          : existingQuestion.answer,

      explanation:
        req.body.explanation !== undefined
          ? req.body.explanation
          : existingQuestion.explanation
    }

    const validationError = validateQuestionData(
      updatedQuestion.question,
      updatedQuestion.options,
      updatedQuestion.answer
    )

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      })
    }

    existingQuestion.question = updatedQuestion.question.trim()
    existingQuestion.options = updatedQuestion.options.map(
      (option) => option.trim()
    )
    existingQuestion.answer = updatedQuestion.answer.trim()
    existingQuestion.explanation =
      typeof updatedQuestion.explanation === 'string'
        ? updatedQuestion.explanation.trim()
        : ''

    await existingQuestion.save()

    res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      question: existingQuestion
    })
  } catch (error) {
    console.error('Update question error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to update question'
    })
  }
}

// DELETE /api/admin/questions/:subjectId/:questionId
const deleteQuestion = async (req, res) => {
  try {
    const subjectId = req.params.subjectId.toLowerCase()
    const questionId = Number(req.params.questionId)
    const subject = findSubject(subjectId)

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      })
    }

    if (!Number.isInteger(questionId) || questionId < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid question ID'
      })
    }

    const deletedQuestion = await Question.findOneAndDelete({
      subjectId,
      questionId
    })

    if (!deletedQuestion) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully'
    })
  } catch (error) {
    console.error('Delete question error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to delete question'
    })
  }
}

module.exports = {
  getAnalytics,
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion
}
