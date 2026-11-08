
const express = require('express')
const router = express.Router()

const quizController = require('../controllers/quizController')
const { protect } = require('../middleware/authMiddleware')

// List all quiz subjects
router.get('/', quizController.getAllQuizzes)

// Student quiz history routes
// Keep these BEFORE /:subject.
router.get('/history', protect, quizController.getMyAttempts)

router.get(
  '/history/:attemptId',
  protect,
  quizController.getAttemptDetails
)

// Get questions for one subject
router.get('/:subject', quizController.getQuizBySubject)

// Submit quiz (login required)
router.post('/:subject/submit', protect, quizController.submitQuiz)

module.exports = router
