
const express = require('express')
const router = express.Router()

const User = require('../models/User')

const {
  protect,
  adminOnly
} = require('../middleware/authMiddleware')

const adminController = require('../controllers/adminController')

// Admin dashboard verification
router.get('/dashboard', protect, adminOnly, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the ELECTRO-Q Admin Dashboard!',
    admin: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  })
})

// Admin analytics
router.get(
  '/analytics',
  protect,
  adminOnly,
  adminController.getAnalytics
)

// Get all registered users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: users.length,
      users
    })
  } catch (error) {
    console.error('User retrieval failed:', error.message)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve users'
    })
  }
})

// ========================================
// QUESTION BANK MANAGEMENT
// ========================================

// Get questions for a subject
router.get(
  '/questions/:subjectId',
  protect,
  adminOnly,
  adminController.getQuestions
)

// Add a question
router.post(
  '/questions/:subjectId',
  protect,
  adminOnly,
  adminController.addQuestion
)

// Update a question
router.put(
  '/questions/:subjectId/:questionId',
  protect,
  adminOnly,
  adminController.updateQuestion
)

// Delete a question
router.delete(
  '/questions/:subjectId/:questionId',
  protect,
  adminOnly,
  adminController.deleteQuestion
)

module.exports = router
