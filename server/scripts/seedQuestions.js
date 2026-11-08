
require('dotenv').config()

const mongoose = require('mongoose')
const connectDB = require('../config/db')
const Question = require('../models/Question')
const { quizzes } = require('../data/data')

const seedQuestions = async () => {
  try {
    await connectDB()

    let insertedCount = 0

    for (const quiz of quizzes) {
      for (const question of quiz.questions) {
        const result = await Question.updateOne(
          {
            subjectId: quiz.id,
            questionId: question.id
          },
          {
            $setOnInsert: {
              subjectId: quiz.id,
              questionId: question.id,
              question: question.question,
              options: question.options,
              answer: question.answer,
              explanation: question.explanation || ''
            }
          },
          {
            upsert: true,
            runValidators: true
          }
        )

        if (result.upsertedCount > 0) {
          insertedCount++
        }
      }
    }

    const totalQuestions = await Question.countDocuments()

    console.log('Question bank migration completed!')
    console.log(`New questions inserted: ${insertedCount}`)
    console.log(`Total questions in database: ${totalQuestions}`)
  } catch (error) {
    console.error('Question bank migration failed:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedQuestions()
