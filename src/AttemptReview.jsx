
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './AttemptReview.css'

const API_URL = 'http://localhost:5000/api/quizzes'

function AttemptReview() {
  const { attemptId } = useParams()
  const navigate = useNavigate()

  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('electroqToken')
    const savedUser = localStorage.getItem('electroqUser')

    if (!token || !savedUser) {
      navigate('/login')
      return
    }

    try {
      const user = JSON.parse(savedUser)

      if (user.role !== 'user') {
        navigate(user.role === 'admin' ? '/admin' : '/login')
        return
      }
    } catch {
      localStorage.removeItem('electroqToken')
      localStorage.removeItem('electroqUser')
      navigate('/login')
      return
    }

    const controller = new AbortController()

    async function fetchAttempt() {
      try {
        const response = await fetch(
          `${API_URL}/history/${encodeURIComponent(attemptId)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
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
          throw new Error(data.message || 'Unable to load attempt.')
        }

        setAttempt(data.attempt)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(
            err.message === 'Failed to fetch'
              ? 'Cannot connect to the server.'
              : err.message
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchAttempt()

    return () => controller.abort()
  }, [attemptId, navigate])

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <main className="attempt-review-page">
        <div className="attempt-message">
          <div className="attempt-spinner"></div>
          <h2>Loading your attempt...</h2>
        </div>
      </main>
    )
  }

  if (error || !attempt) {
    return (
      <main className="attempt-review-page">
        <div className="attempt-message">
          <p className="attempt-eyebrow">ELECTRO-Q</p>
          <h1>Attempt unavailable</h1>
          <p>{error || 'This quiz attempt could not be found.'}</p>
          <Link to="/dashboard" className="attempt-primary-btn">
            Back to Dashboard
          </Link>
        </div>
      </main>
    )
  }

  const percentage = attempt.percentage
  const correctCount = attempt.results.filter(
    (item) => item.correct
  ).length

  return (
    <main className="attempt-review-page">
      <div className="attempt-review-container">

        <header className="attempt-navbar">
          <Link to="/" className="attempt-logo">
            ELECTRO<span>-Q</span>
          </Link>

          <Link to="/dashboard" className="attempt-back-link">
            ← Back to Dashboard
          </Link>
        </header>

        <section className="attempt-heading">
          <p className="attempt-eyebrow">PREVIOUS ASSESSMENT</p>
          <h1>{attempt.subject}</h1>
          <p>Review your saved quiz attempt and learn from your answers.</p>
          <span className="attempt-date">
            Completed on {formatDate(attempt.createdAt)}
          </span>
        </section>

        <section className="attempt-summary">
          <div className="attempt-score-card">
            <span>Final Score</span>
            <strong>{percentage}%</strong>
            <p>{attempt.score} out of {attempt.totalQuestions} correct</p>
          </div>

          <div className="attempt-stat">
            <span>Correct Answers</span>
            <strong className="attempt-correct">
              {correctCount}
            </strong>
          </div>

          <div className="attempt-stat">
            <span>Incorrect Answers</span>
            <strong className="attempt-incorrect">
              {attempt.totalQuestions - correctCount}
            </strong>
          </div>

          <div className="attempt-stat">
            <span>Total Questions</span>
            <strong>{attempt.totalQuestions}</strong>
          </div>
        </section>

        <section className="attempt-answers-section">
          <div className="attempt-section-heading">
            <div>
              <p className="attempt-eyebrow">DETAILED RESULTS</p>
              <h2>Answer Review</h2>
            </div>

            <span>{attempt.results.length} Questions</span>
          </div>

          {attempt.results.map((item, index) => (
            <article
              className={`attempt-question-card ${
                item.correct ? 'answer-correct' : 'answer-incorrect'
              }`}
              key={item.questionId}
            >
              <div className="attempt-question-header">
                <span>QUESTION {String(index + 1).padStart(2, '0')}</span>

                <span className="attempt-answer-status">
                  {item.correct ? '✓ Correct' : '✕ Incorrect'}
                </span>
              </div>

              <h3>{item.question}</h3>

              <div className="attempt-answer-details">
                <p>
                  <strong>Your answer</strong>
                  <span>{item.selectedAnswer}</span>
                </p>

                <p>
                  <strong>Correct answer</strong>
                  <span>{item.correctAnswer}</span>
                </p>
              </div>

              <div className="attempt-explanation">
                <strong>Explanation</strong>
                <p>
                  {item.explanation || 'No explanation available.'}
                </p>
              </div>
            </article>
          ))}
        </section>

        <div className="attempt-bottom-actions">
          <Link to="/dashboard" className="attempt-primary-btn">
            Back to Quiz History
          </Link>

          <Link to="/" className="attempt-secondary-btn">
            Explore Subjects
          </Link>
        </div>

        <footer className="attempt-footer">
          ELECTRO-Q / STUDENT PERFORMANCE REVIEW
        </footer>

      </div>
    </main>
  )
}

export default AttemptReview
