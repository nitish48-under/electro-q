
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Quiz.css'

const API_URL = 'http://localhost:5000/api/quizzes'

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
  const navigate = useNavigate()
  const subjectName = subjectNames[subject] || 'ECE Quiz'

  const [quizQuestions, setQuizQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [reviewResults, setReviewResults] = useState([])
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [attemptId, setAttemptId] = useState('')

  const selectedAnswer = userAnswers[currentQuestion] ?? null

  useEffect(() => {
    const controller = new AbortController()

    async function fetchQuiz() {
      setLoading(true)
      setError('')
      setQuizQuestions([])
      setCurrentQuestion(0)
      setUserAnswers([])
      setReviewResults([])
      setFinished(false)
      setScore(0)
      setAttemptId('')

      try {
        const response = await fetch(
          `${API_URL}/${encodeURIComponent(subject)}`,
          { signal: controller.signal }
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Unable to load quiz.')
        }

        const formattedQuestions = data.questions.map((item) => ({
          id: item.id,
          question: item.question,
          options: item.options,
        }))

        if (!formattedQuestions.length) {
          throw new Error('No questions are available for this subject.')
        }

        setQuizQuestions(formattedQuestions)
        setUserAnswers(Array(formattedQuestions.length).fill(null))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(
            err.message === 'Failed to fetch'
              ? 'Cannot connect to the backend. Check that the server is running.'
              : err.message
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchQuiz()

    return () => controller.abort()
  }, [subject])

  const selectAnswer = (index) => {
    setUserAnswers((previous) => {
      const updated = [...previous]
      updated[currentQuestion] = index
      return updated
    })
  }

  const goPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1)
    }
  }

  const handleNext = async () => {
    if (selectedAnswer === null || submitting) return

    setError('')

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((previous) => previous + 1)
      return
    }

    // Get the logged-in student's token.
    const token = localStorage.getItem('electroqToken')

    if (!token) {
      setError('Please log in before submitting your quiz.')

      setTimeout(() => {
        navigate('/login')
      }, 1500)

      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(
        `${API_URL}/${encodeURIComponent(subject)}/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            answers: quizQuestions.map((item, index) => ({
              questionId: item.id,
              answer: item.options[userAnswers[index]],
            })),
          }),
        }
      )

      const data = await response.json()

      if (response.status === 401) {
        localStorage.removeItem('electroqToken')
        localStorage.removeItem('electroqUser')
        navigate('/login')
        return
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to submit your quiz.')
      }

      setScore(data.score)
      setReviewResults(data.results || [])
      setAttemptId(data.attemptId || '')
      setFinished(true)

    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Could not submit answers. Check your backend connection.'
          : err.message
      )
    } finally {
      setSubmitting(false)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setUserAnswers(Array(quizQuestions.length).fill(null))
    setReviewResults([])
    setFinished(false)
    setScore(0)
    setAttemptId('')
    setError('')
  }

  if (loading) {
    return (
      <main className="quiz-page">
        <div className="quiz-message-card">
          <div className="loading-spinner"></div>
          <h2>Preparing your quiz</h2>
          <p>Loading your questions. Please wait...</p>
        </div>
      </main>
    )
  }

  if (error && quizQuestions.length === 0) {
    return (
      <main className="quiz-page">
        <div className="quiz-message-card">
          <p className="quiz-label">ELECTRO-Q</p>
          <h1>Unable to load quiz</h1>
          <p>{error}</p>
          <Link to="/" className="quiz-primary-btn">
            Back to Subjects
          </Link>
        </div>
      </main>
    )
  }

  if (quizQuestions.length === 0) {
    return (
      <main className="quiz-page">
        <div className="quiz-message-card">
          <h1>Quiz not found</h1>
          <p>This subject does not have a quiz yet.</p>
          <Link to="/" className="quiz-primary-btn">
            Back to Subjects
          </Link>
        </div>
      </main>
    )
  }

  if (finished) {
    const percentage = Math.round(
      (score / quizQuestions.length) * 100
    )

    return (
      <main className="quiz-page">
        <div className="quiz-container result-container">
          <Link to="/" className="quiz-back-link">
            ← Back to Subjects
          </Link>

          <section className="result-card">
            <div className="result-icon">✓</div>

            <p className="quiz-label">QUIZ COMPLETED</p>
            <h1>Assessment finished!</h1>
            <p className="result-subtitle">{subjectName}</p>

            <div className="score-circle">
              <strong>{percentage}%</strong>
              <span>Your score</span>
            </div>

            <div className="score-details">
              <div>
                <strong>{score}</strong>
                <span>Correct</span>
              </div>

              <div>
                <strong>{quizQuestions.length - score}</strong>
                <span>Incorrect</span>
              </div>

              <div>
                <strong>{quizQuestions.length}</strong>
                <span>Total</span>
              </div>
            </div>

            <p className="result-message">
              {percentage >= 80
                ? 'Excellent work! Your ECE fundamentals are strong.'
                : percentage >= 50
                  ? 'Good attempt! Keep practicing to improve your score.'
                  : 'Keep practicing! Review your answers and try again.'}
            </p>

            {attemptId && (
              <p className="attempt-id">
                Attempt saved successfully
              </p>
            )}

            <div className="result-actions">
              <button className="quiz-primary-btn" onClick={restartQuiz}>
                Try Again
              </button>

              <Link to="/" className="quiz-secondary-btn">
                All Subjects
              </Link>
            </div>
          </section>

          <section className="answer-review">
            <div className="review-title">
              <div>
                <p className="quiz-label">LEARN FROM YOUR ATTEMPT</p>
                <h2>Answer Review</h2>
              </div>

              <span>{quizQuestions.length} Questions</span>
            </div>

            {quizQuestions.map((item, index) => {
              const userAnswer = userAnswers[index]

              const result = reviewResults.find(
                (entry) => entry.questionId === item.id
              )

              const isCorrect = result?.correct === true

              return (
                <article
                  className={`review-item ${
                    isCorrect ? 'correct' : 'incorrect'
                  }`}
                  key={item.id}
                >
                  <div className="review-header">
                    <span>QUESTION {index + 1}</span>

                    <span className="review-status">
                      {isCorrect ? '✓ Correct' : '✕ Incorrect'}
                    </span>
                  </div>

                  <h3>{item.question}</h3>

                  <p>
                    <strong>Your answer:</strong>{' '}
                    {item.options[userAnswer] ?? 'Not answered'}
                  </p>

                  <p>
                    <strong>Correct answer:</strong>{' '}
                    {result?.correctAnswer || 'Unavailable'}
                  </p>

                  <p className="explanation">
                    <strong>Explanation:</strong>{' '}
                    {result?.explanation || 'No explanation available.'}
                  </p>
                </article>
              )
            })}
          </section>
        </div>
      </main>
    )
  }

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const answeredCount = userAnswers.filter(
    (answer) => answer !== null
  ).length

  return (
    <main className="quiz-page">
      <div className="quiz-container">

        <header className="quiz-topbar">
          <Link to="/" className="quiz-back-link">
            ← Back to Subjects
          </Link>

          <Link to="/" className="quiz-brand">
            ELECTRO<span>-Q</span>
          </Link>
        </header>

        <section className="quiz-heading">
          <div>
            <p className="quiz-label">YOUR ASSESSMENT</p>
            <h1>{subjectName}</h1>

            <p className="quiz-subtitle">
              Take your time. Think carefully and choose the best answer.
            </p>
          </div>

          <div className="quiz-counter">
            <strong>{currentQuestion + 1}</strong>
            <span>/ {quizQuestions.length}</span>
          </div>
        </section>

        <section className="quiz-progress-section">
          <div className="progress-information">
            <span>YOUR PROGRESS</span>
            <strong>{Math.round(progress)}% completed</strong>
          </div>

          <div className="quiz-progress-track">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="progress-footer">
            <span>{answeredCount} answered</span>
            <span>{quizQuestions.length - answeredCount} remaining</span>
          </div>
        </section>

        <section className="question-card">
          <div className="question-card-top">
            <span className="question-number">
              QUESTION {String(currentQuestion + 1).padStart(2, '0')}
            </span>

            <span className="question-total">
              {quizQuestions.length} QUESTIONS
            </span>
          </div>

          <h2>{question.question}</h2>

          <p className="answer-instruction">
            Select one answer below
          </p>

          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                type="button"
                key={index}
                className={`option-card ${
                  selectedAnswer === index ? 'selected' : ''
                }`}
                onClick={() => selectAnswer(index)}
                aria-pressed={selectedAnswer === index}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span className="option-text">{option}</span>

                <span className="option-check">
                  {selectedAnswer === index ? '✓' : ''}
                </span>
              </button>
            ))}
          </div>

          {error && <p className="quiz-error">{error}</p>}

          <div className="question-navigation">
            <button
              type="button"
              className="quiz-secondary-btn"
              onClick={goPrevious}
              disabled={currentQuestion === 0 || submitting}
            >
              ← Previous
            </button>

            <button
              type="button"
              className="quiz-primary-btn"
              onClick={handleNext}
              disabled={selectedAnswer === null || submitting}
            >
              {submitting
                ? 'Submitting...'
                : currentQuestion === quizQuestions.length - 1
                  ? 'Submit Quiz'
                  : 'Next Question →'}
            </button>
          </div>
        </section>

        <footer className="quiz-footer">
          <span>ELECTRO-Q / ECE ASSESSMENT</span>
          <span>Stay focused. Do your best.</span>
        </footer>
      </div>
    </main>
  )
}

export default Quiz
