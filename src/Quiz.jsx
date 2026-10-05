import { useState } from 'react'
import './Quiz.css'

const questions = [
  {
    question: 'Which component is primarily used for amplification?',
    options: ['Diode', 'Transistor', 'Capacitor', 'Resistor'],
    answer: 'Transistor',
  },
  {
    question: 'What is the unit of capacitance?',
    options: ['Ohm', 'Henry', 'Farad', 'Weber'],
    answer: 'Farad',
  },
  {
    question: 'Which logic gate produces HIGH output only when all inputs are HIGH?',
    options: ['OR', 'XOR', 'AND', 'NOR'],
    answer: 'AND',
  },
  {
    question: 'What does ADC stand for?',
    options: [
      'Analog Digital Controller',
      'Analog-to-Digital Converter',
      'Automatic Data Controller',
      'Advanced Digital Circuit',
    ],
    answer: 'Analog-to-Digital Converter',
  },
  {
    question: 'Which protocol is commonly used for lightweight IoT messaging?',
    options: ['HTTP', 'FTP', 'MQTT', 'SMTP'],
    answer: 'MQTT',
  },
]

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[currentQuestion]

  const handleNext = () => {
    if (!selectedAnswer) {
      return
    }

    if (selectedAnswer === question.answer) {
      setScore(score + 1)
    }

    if (currentQuestion === questions.length - 1) {
      setFinished(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer('')
    }
  }

  if (finished) {
    return (
      <div className="quiz-page">
        <div className="result-card">
          <p className="quiz-label">QUIZ COMPLETED</p>

          <h1>Your Result</h1>

          <div className="score">
            {score}/{questions.length}
          </div>

          <p>
            You answered {score} out of {questions.length} questions correctly.
          </p>

          <button
            className="quiz-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">

        <div className="quiz-header">
          <div>
            <p className="quiz-label">ELECTRO-Q</p>
            <h2>ECE Quiz</h2>
          </div>

          <span>
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="question-card">
          <p className="question-number">
            QUESTION {currentQuestion + 1}
          </p>

          <h1>{question.question}</h1>

          <div className="options">
            {question.options.map((option) => (
              <button
                key={option}
                className={`option ${
                  selectedAnswer === option ? 'selected' : ''
                }`}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            className="quiz-button"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1
              ? 'Submit Quiz'
              : 'Next Question'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Quiz