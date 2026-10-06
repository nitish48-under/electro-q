import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import questions from './questions'
import './Quiz.css'

const subjectNames = {
  analog: 'Analog Electronics',
  digital: 'Digital Electronics',
  communication: 'Communication Systems',
  embedded: 'Embedded Systems',
  signals: 'Signals & Systems',
  microprocessors: 'Microprocessors',
}

function Quiz() {
  const { subject } = useParams()

  const quizQuestions = questions[subject] || []
  const subjectName = subjectNames[subject] || 'ECE Quiz'

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [userAnswers, setUserAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const question = quizQuestions[currentQuestion]

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    const updatedAnswers = [...userAnswers]
    updatedAnswers[currentQuestion] = selectedAnswer
    setUserAnswers(updatedAnswers)

    if (currentQuestion === quizQuestions.length - 1) {
      setFinished(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    }
  }

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].answer ? 1 : 0)
    }, 0)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setUserAnswers([])
    setFinished(false)
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="result-card">
          <h1>Quiz Not Found</h1>
          <p>This subject does not have a quiz yet.</p>
          <Link to="/subjects">
            <button className="restart-btn">Back to Subjects</button>
          </Link>
        </div>
      </div>
    )
  }

  if (finished) {
    const score = calculateScore()
    const percentage = Math.round((score / quizQuestions.length) * 100)

    return (
      <div className="quiz-page">

        <div className="result-card">

          <p className="quiz-label">QUIZ COMPLETED</p>

          <h1>{subjectName}</h1>

          <div className="score-circle">
            <strong>{percentage}%</strong>
            <span>Score</span>
          </div>

          <h2>
            {score} / {quizQuestions.length}
          </h2>

          <p className="result-message">
            {percentage >= 80
              ? 'Excellent work! Your ECE fundamentals are strong.'
              : percentage >= 50
                ? 'Good attempt! Keep practicing to improve your score.'
                : 'Keep practicing! Review the answers below and try again.'}
          </p>

          <div className="answer-review">

            <h2>Answer Review</h2>

            {quizQuestions.map((item, index) => {

              const userAnswer = userAnswers[index]
              const isCorrect = userAnswer === item.answer

              return (
                <div
                  className={`review-item ${
                    isCorrect ? 'correct' : 'incorrect'
                  }`}
                  key={index}
                >

                  <div className="review-header">
                    <span>Question {index + 1}</span>

                    <span className="review-status">
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>

                  <h3>{item.question}</h3>

                  <p>
                    <strong>Your answer:</strong>{' '}
                    {item.options[userAnswer]}
                  </p>

                  <p>
                    <strong>Correct answer:</strong>{' '}
                    {item.options[item.answer]}
                  </p>

                  <p className="explanation">
                    {item.explanation}
                  </p>

                </div>
              )
            })}

          </div>

          <div className="result-actions">

            <button
              className="restart-btn"
              onClick={restartQuiz}
            >
              Try Again
            </button>

            <Link to="/subjects">
              <button className="subjects-btn">
                All Subjects
              </button>
            </Link>

          </div>

        </div>

      </div>
    )
  }

  const progress =
    ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="quiz-page">

      <div className="quiz-container">

        <div className="quiz-header">

          <Link to="/subjects" className="back-link">
            ← Subjects
          </Link>

          <div>
            <p className="quiz-label">{subjectName}</p>
            <h1>Test Your Knowledge</h1>
          </div>

          <span className="question-count">
            {currentQuestion + 1} / {quizQuestions.length}
          </span>

        </div>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="question-card">

          <p className="question-number">
            QUESTION {String(currentQuestion + 1).padStart(2, '0')}
          </p>

          <h2>{question.question}</h2>

          <div className="options">

            {question.options.map((option, index) => (

              <button
                key={index}
                className={`option ${
                  selectedAnswer === index ? 'selected' : ''
                }`}
                onClick={() => setSelectedAnswer(index)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{option}</span>
              </button>

            ))}

          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            {currentQuestion === quizQuestions.length - 1
              ? 'Finish Quiz'
              : 'Next Question →'}
          </button>

        </div>

      </div>

    </div>
  )
}

export default Quiz