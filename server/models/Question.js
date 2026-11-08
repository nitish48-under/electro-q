
const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
  {
    subjectId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    questionId: {
      type: Number,
      required: true,
      min: 1
    },

    question: {
      type: String,
      required: true,
      trim: true
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: (options) =>
          options.length === 4 &&
          options.every((option) => option.trim().length > 0),
        message: 'Every question must have exactly four non-empty options'
      }
    },

    answer: {
      type: String,
      required: true,
      trim: true
    },

    explanation: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
)

// Prevent duplicate question IDs within the same subject.
questionSchema.index(
  { subjectId: 1, questionId: 1 },
  { unique: true }
)

module.exports = mongoose.model('Question', questionSchema)
