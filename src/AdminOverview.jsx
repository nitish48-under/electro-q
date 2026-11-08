import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

function AdminOverview() {
  const { admin } = useOutletContext()

  const [analytics, setAnalytics] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('electroqToken')

      try {
        const response = await fetch(
          'http://localhost:5000/api/admin/analytics',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Unable to load analytics')
        }

        setAnalytics(data.analytics)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  const stats = analytics
    ? [
        {
          label: 'TOTAL USERS',
          value: analytics.users.total,
          description: 'Registered accounts',
          className: 'users'
        },
        {
          label: 'STUDENTS',
          value: analytics.users.students,
          description: 'Student accounts',
          className: 'students'
        },
        {
          label: 'QUIZ ATTEMPTS',
          value: analytics.performance.totalAttempts,
          description: 'Total submissions',
          className: 'attempts'
        },
        {
          label: 'AVERAGE SCORE',
          value: `${analytics.performance.averageScore}%`,
          description: 'Across all student attempts',
          className: 'average'
        },
        {
          label: 'QUIZ SUBJECTS',
          value: analytics.quizzes.totalSubjects,
          description: `${analytics.quizzes.totalQuestions} questions available`,
          className: 'subjects'
        },
        {
          label: 'HIGHEST SCORE',
          value: `${analytics.performance.highestScore}%`,
          description: 'Best recorded result',
          className: 'highest'
        }
      ]
    : []

  const subjectPerformance = analytics?.subjectPerformance || []
  const recentAttempts = analytics?.recentAttempts || []

  return (
    <div className="admin-main">

      {/* PAGE HEADER */}
      <header className="admin-overview-header">
        <div>
          <p className="admin-eyebrow">
            ADMINISTRATION / OVERVIEW
          </p>

          <h1>
            Welcome back, <span>{admin?.name}</span>.
          </h1>

          <p className="admin-description">
            Here's what's happening across your ELECTRO-Q platform.
          </p>
        </div>

        <div className="admin-overview-status">
          <span className="admin-status-dot" />
          Platform overview
        </div>
      </header>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="admin-users-message admin-users-error">
          {error}
        </div>
      )}

      {/* PLATFORM STATISTICS */}
      <section className="admin-stats-section">
        <div className="admin-section-heading">
          <div>
            <p className="admin-eyebrow">PLATFORM INSIGHTS</p>
            <h2>Platform statistics</h2>
          </div>

          <span className="admin-section-caption">
            Live platform data
          </span>
        </div>

        <div className="admin-stats">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  className="admin-stat-card admin-stat-loading"
                  key={index}
                >
                  <span>LOADING</span>
                  <h2>—</h2>
                  <p>Please wait...</p>
                </div>
              ))
            : stats.map((stat) => (
                <div
                  className={`admin-stat-card admin-stat-${stat.className}`}
                  key={stat.label}
                >
                  <span>{stat.label}</span>
                  <h2>{stat.value}</h2>
                  <p>{stat.description}</p>
                </div>
              ))}
        </div>
      </section>

      {/* SUBJECT PERFORMANCE */}
      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <p className="admin-eyebrow">
              ACADEMIC / PERFORMANCE
            </p>
            <h2>Subject performance</h2>
          </div>

          <span className="admin-section-caption">
            {subjectPerformance.length} subjects tracked
          </span>
        </div>

        {loading ? (
          <div className="admin-users-message">
            Loading subject performance...
          </div>
        ) : subjectPerformance.length === 0 ? (
          <div className="admin-users-message">
            No quiz attempts recorded yet.
          </div>
        ) : (
          <div className="admin-performance-grid">
            {subjectPerformance.map((subject) => {
              const progress = Math.min(
                100,
                Math.max(0, Number(subject.averageScore) || 0)
              )

              return (
                <div
                  className="admin-performance-card"
                  key={subject.subjectId}
                >
                  <div className="admin-performance-card-header">
                    <h3>{subject.subject}</h3>
                    <span>{subject.attempts} attempts</span>
                  </div>

                  <div className="admin-performance-numbers">
                    <strong>{subject.averageScore}%</strong>
                    <span>Average score</span>
                  </div>

                  <div className="admin-performance-track">
                    <div
                      style={{
                        width: `${progress}%`
                      }}
                    />
                  </div>

                  <p>
                    Highest score: <strong>{subject.highestScore}%</strong>
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* RECENT QUIZ ACTIVITY */}
      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <p className="admin-eyebrow">
              PLATFORM / ACTIVITY
            </p>
            <h2>Recent quiz activity</h2>
          </div>

          <span className="admin-section-caption">
            Latest submissions
          </span>
        </div>

        {loading ? (
          <div className="admin-users-message">
            Loading recent activity...
          </div>
        ) : recentAttempts.length === 0 ? (
          <div className="admin-users-message">
            No recent quiz activity.
          </div>
        ) : (
          <div className="admin-users-table-wrapper">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>SUBJECT</th>
                  <th>SCORE</th>
                  <th>PERCENTAGE</th>
                  <th>DATE</th>
                </tr>
              </thead>

              <tbody>
                {recentAttempts.map((attempt) => (
                  <tr key={attempt._id}>
                    <td className="admin-user-name">
                      {attempt.user?.name || 'Unknown user'}
                    </td>

                    <td>{attempt.subject}</td>

                    <td>
                      {attempt.score}/{attempt.totalQuestions}
                    </td>

                    <td>
                      <span className="admin-attempt-percentage">
                        {attempt.percentage}%
                      </span>
                    </td>

                    <td>
                      {new Date(attempt.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  )
}

export default AdminOverview