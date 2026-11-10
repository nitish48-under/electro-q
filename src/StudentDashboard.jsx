
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './StudentDashboard.css'

const API_URL = 'https://electro-q-backend.onrender.com/api/quizzes'

function StudentDashboard() {
  const navigate = useNavigate()

  const [dashboard, setDashboard] = useState({
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
    attempts: [],
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('electroqToken')
    const savedUser = localStorage.getItem('electroqUser')

    if (!token || !savedUser) {
      navigate('/login')
      return
    }

    let user

    try {
      user = JSON.parse(savedUser)
    } catch {
      localStorage.removeItem('electroqToken')
      localStorage.removeItem('electroqUser')
      navigate('/login')
      return
    }

    if (user.role !== 'user') {
      navigate(user.role === 'admin' ? '/admin' : '/login')
      return
    }

    const controller = new AbortController()

    async function fetchDashboard() {
      try {
        const response = await fetch(`${API_URL}/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        })

        const data = await response.json()

        if (response.status === 401) {
          localStorage.removeItem('electroqToken')
          localStorage.removeItem('electroqUser')
          navigate('/login')
          return
        }

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Unable to load dashboard.')
        }

        setDashboard({
          totalAttempts: data.totalAttempts,
          averageScore: data.averageScore,
          bestScore: data.bestScore,
          attempts: data.attempts || [],
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(
            err.message === 'Failed to fetch'
              ? 'Cannot connect to the backend. Please check the server.'
              : err.message
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchDashboard()

    return () => controller.abort()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('electroqToken')
    localStorage.removeItem('electroqUser')
    navigate('/login')
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getScoreClass = (percentage) => {
    if (percentage >= 80) return 'excellent'
    if (percentage >= 50) return 'average'
    return 'needs-improvement'
  }

  // Calculate performance separately for every subject.
  const subjectPerformance = Object.values(
    dashboard.attempts.reduce((groups, attempt) => {
      const subjectId = attempt.subjectId || attempt.subject

      if (!groups[subjectId]) {
        groups[subjectId] = {
          subjectId,
          subject: attempt.subject,
          totalScore: 0,
          attempts: 0,
          bestScore: 0,
        }
      }

      const group = groups[subjectId]
      const percentage = Number(attempt.percentage) || 0

      group.totalScore += percentage
      group.attempts += 1
      group.bestScore = Math.max(group.bestScore, percentage)

      return groups
    }, {})
  )
    .map((subject) => ({
      ...subject,
      averageScore: Math.round(
        subject.totalScore / subject.attempts
      ),
    }))
    .sort((a, b) => a.averageScore - b.averageScore)

  if (loading) {
    return (
      <main className="student-dashboard">
        <div className="dashboard-message">
          <div className="dashboard-spinner"></div>
          <h2>Loading your dashboard...</h2>
          <p>Preparing your performance report.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="student-dashboard">
      <div className="student-dashboard-container">

        <header className="student-navbar">
          <Link to="/" className="student-logo">
            ELECTRO<span>-Q</span>
          </Link>

          <nav>
            <Link to="/">Home</Link>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </header>

        <section className="student-welcome">
          <div>
            <p className="student-eyebrow">STUDENT OVERVIEW</p>
            <h1>Your Performance</h1>
            <p>
              Track your quiz attempts and monitor your ECE learning progress.
            </p>
          </div>

          <Link to="/" className="dashboard-start-btn">
            Explore Subjects â†’
          </Link>
        </section>

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        <section className="performance-grid">

          <article className="performance-card">
            <div className="performance-card-icon">Q</div>
            <p>Total Attempts</p>
            <h2>{dashboard.totalAttempts}</h2>
            <span>Quizzes completed</span>
          </article>

          <article className="performance-card">
            <div className="performance-card-icon">%</div>
            <p>Average Score</p>
            <h2>{dashboard.averageScore}%</h2>
            <span>Across all attempts</span>
          </article>

          <article className="performance-card">
            <div className="performance-card-icon">â˜…</div>
            <p>Best Score</p>
            <h2>{dashboard.bestScore}%</h2>
            <span>Your highest percentage</span>
          </article>

        </section>

        {/* SUBJECT-WISE PERFORMANCE ANALYTICS */}
        <section className="analytics-section">

          <div className="analytics-heading">
            <div>
              <p className="student-eyebrow">PERFORMANCE INSIGHTS</p>
              <h2>Subject Analytics</h2>
              <p className="analytics-description">
                Understand your strengths and identify subjects that need more practice.
              </p>
            </div>

            <span className="analytics-count">
              {subjectPerformance.length} subjects attempted
            </span>
          </div>

          {subjectPerformance.length === 0 ? (
            <div className="analytics-empty">
              <div className="analytics-empty-icon">â†—</div>
              <h3>Your analytics will appear here</h3>
              <p>
                Complete a quiz to start tracking your subject-wise performance.
              </p>
              <Link to="/" className="dashboard-start-btn">
                Explore Subjects â†’
              </Link>
            </div>
          ) : (
            <div className="subject-analytics-grid">
              {subjectPerformance.map((subject) => (
                <article
                  className="subject-analytics-card"
                  key={subject.subjectId}
                >
                  <div className="subject-analytics-top">
                    <div>
                      <h3>{subject.subject}</h3>
                      <span>
                        {subject.attempts} {subject.attempts === 1 ? 'attempt' : 'attempts'}
                      </span>
                    </div>

                    <strong className={getScoreClass(subject.averageScore)}>
                      {subject.averageScore}%
                    </strong>
                  </div>

                  <div className="subject-progress-track">
                    <div
                      className={`subject-progress-fill ${getScoreClass(
                        subject.averageScore
                      )}`}
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, subject.averageScore)
                        )}%`,
                      }}
                    ></div>
                  </div>

                  <div className="subject-analytics-bottom">
                    <span>Average score</span>
                    <span>
                      Best: <strong>{subject.bestScore}%</strong>
                    </span>
                  </div>

                  <div className={`subject-feedback ${getScoreClass(subject.averageScore)}`}>
                    {subject.averageScore >= 80
                      ? 'Excellent performance'
                      : subject.averageScore >= 50
                        ? 'Keep practising'
                        : 'Needs more practice'}
                  </div>
                </article>
              ))}
            </div>
          )}

        </section>

        {/* QUIZ HISTORY */}
        <section className="history-section">
          <div className="history-heading">
            <div>
              <p className="student-eyebrow">YOUR ACTIVITY</p>
              <h2>Quiz History</h2>
            </div>

            <span>{dashboard.totalAttempts} attempts</span>
          </div>

          {dashboard.attempts.length === 0 ? (
            <div className="empty-history">
              <div className="empty-history-icon">Q</div>
              <h3>No quiz attempts yet</h3>
              <p>
                Complete your first ECE quiz to see your performance here.
              </p>
              <Link to="/" className="dashboard-start-btn">
                Start Your First Quiz â†’
              </Link>
            </div>
          ) : (
            <div className="history-table-wrapper">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {dashboard.attempts.map((attempt) => (
                    <tr key={attempt._id}>
                      <td>
                        <strong>{attempt.subject}</strong>
                      </td>

                      <td>
                        {attempt.score}/{attempt.totalQuestions}
                      </td>

                      <td>
                        <span
                          className={`history-score ${getScoreClass(
                            attempt.percentage
                          )}`}
                        >
                          {attempt.percentage}%
                        </span>
                      </td>

                      <td>{formatDate(attempt.createdAt)}</td>

                      <td>
                        <Link
                          to={`/dashboard/attempt/${attempt._id}`}
                          className="review-attempt-btn"
                        >
                          Review â†’
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="student-dashboard-footer">
          <span>ELECTRO-Q / STUDENT PORTAL</span>
          <span>Keep learning. Keep improving.</span>
        </footer>

      </div>
    </main>
  )
}

export default StudentDashboard

