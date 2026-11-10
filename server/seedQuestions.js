const mongoose = require('mongoose')
require('dotenv').config()

const { quizzes } = require('./data/data')
const Question = require('./models/Question')

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')

    let totalInserted = 0

    for (const quiz of quizzes) {
      for (const item of quiz.questions) {
        await Question.updateOne(
          {
            subjectId: quiz.id,
            questionId: item.id
          },
          {
            $set: {
              subjectId: quiz.id,
              questionId: item.id,
              question: item.question,
              options: item.options,
              answer: item.answer,
              explanation: item.explanation || ''
            }
          },
          { upsert: true }
        )

        totalInserted++
      }
    }

    console.log(`Successfully seeded ${totalInserted} questions`)
  } catch (error) {
    console.error('Seeding failed:', error)
  } finally {
    await mongoose.disconnect()
  }
}

seedQuestions()