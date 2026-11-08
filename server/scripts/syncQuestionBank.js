
const fs = require('fs')
const path = require('path')
const vm = require('vm')

const sourcePath = path.join(__dirname, '../../src/questions.js')
const outputPath = path.join(__dirname, '../data/data.js')

const source = fs.readFileSync(sourcePath, 'utf8').replace(
  /export\s+default\s+questions\s*;?\s*$/,
  'module.exports = questions'
)

const sandbox = { module: { exports: {} } }

vm.runInNewContext(source, sandbox, { filename: sourcePath })

const sourceQuestions = sandbox.module.exports

const subjectDetails = {
  analog: {
    subject: 'Analog Electronics',
    description: 'Diodes, transistors, amplifiers and analog circuits.'
  },
  digital: {
    subject: 'Digital Electronics',
    description: 'Logic gates, Boolean algebra, flip-flops and digital circuits.'
  },
  communication: {
    subject: 'Communication Systems',
    description: 'Modulation, signals and communication concepts.'
  },
  embedded: {
    subject: 'Embedded Systems',
    description: 'Microcontrollers, GPIO, protocols and embedded systems.'
  },
  signals: {
    subject: 'Signals & Systems',
    description: 'Signals, systems, transforms and signal processing.'
  },
  microprocessors: {
    subject: 'Microprocessors',
    description: 'Architecture, registers, memory and instructions.'
  }
}

const quizzes = Object.entries(sourceQuestions).map(([id, items]) => {
  const details = subjectDetails[id]

  if (!details) {
    throw new Error(`Unknown subject: ${id}`)
  }

  return {
    id,
    ...details,
    questions: items.map((item, index) => ({
      id: index + 1,
      question: item.question,
      options: item.options,
      answer: item.options[item.answer],
      explanation: item.explanation || ''
    }))
  }
})

const totalQuestions = quizzes.reduce(
  (total, quiz) => total + quiz.questions.length,
  0
)

fs.writeFileSync(
  outputPath,
  `const quizzes = ${JSON.stringify(quizzes, null, 2)}\n\nmodule.exports = { quizzes }\n`,
  'utf8'
)

console.log('Question bank generated successfully!')
console.log(`Subjects: ${quizzes.length}`)
console.log(`Total questions: ${totalQuestions}`)

quizzes.forEach((quiz) => {
  console.log(`${quiz.subject}: ${quiz.questions.length} questions`)
})
