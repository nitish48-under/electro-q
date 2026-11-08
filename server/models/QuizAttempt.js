
const mongoose = require('mongoose')

const quizAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    subjectId: {
      type: String,
      required: true,
      trim: true
    },

    subject: {
      type: String,
      required: true,
      trim: true
    },

    score: {
      type: Number,
      required: true,
      min: 0
    },

    totalQuestions: {
      type: Number,
      required: true,
      min: 1
    },

    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    results: [
      {
        questionId: {
          type: Number,
          required: true
        },

        question: {
          type: String,
          required: true
        },

        selectedAnswer: {
          type: String,
          required: true
        },

        correctAnswer: {
          type: String,
          required: true
        },

        correct: {
          type: Boolean,
          required: true
        },

        explanation: {
          type: String,
          default: ''
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

quizAttemptSchema.index({ user: 1, createdAt: -1 })

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema)
