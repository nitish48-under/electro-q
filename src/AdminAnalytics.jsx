
import { useEffect, useState } from 'react'

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchAnalytics = async () => {
    const token = localStorage.getItem('electroqToken')

    setLoading(true)
    setError('')

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

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const performance = analytics?.performance
  const subjects = analytics?.subjectPerformance || []
  const recentAttempts = analytics?.recentAttempts || []

  const stats = [
    {
      label: 'TOTAL ATTEMPTS',
      value: performance?.totalAttempts ?? '—',
      description: 'Quiz submissions',
      type: 'attempts'
    },
    {
      label: 'AVERAGE SCORE',
      value: performance ? `${performance.averageScore}%` : '—',
      description: 'Across all attempts',
      type: 'average'
    },
    {
      label: 'HIGHEST SCORE',
      value: performance ? `${performance.highestScore}%` : '—',
      description: 'Best recorded performance',
      type: 'highest'
    }
  ]

  const rankedSubjects = [...subjects].sort(
    (a, b) => Number(b.averageScore) - Number(a.averageScore)
  )

  return (
    <div className="admin-main admin-analytics-page">

      {/* PAGE HEADER */}
      <header className="admin-analytics-header">
        <div>
          <p className="admin-eyebrow">
            ACADEMIC / ANALYTICS
          </p>

          <h1>Quiz Analytics</h1>

          <p className="admin-description">
            Monitor student performance and understand how your
            ELECTRO-Q platform is being used.
          </p>
        </div>

        <button
          className="admin-refresh-button"
          onClick={fetchAnalytics}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : '↻ Refresh analytics'}
        </button>
      </header>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="admin-users-message admin-users-error">
          {error}
        </div>
      )}

      {/* PERFORMANCE SUMMARY */}
      <section className="admin-analytics-summary">
        <div className="admin-section-heading">
          <div>
            <p className="admin-eyebrow">PLATFORM INSIGHTS</p>
            <h2>Performance summary</h2>
          </div>
        </div>

        <div className="admin-stats admin-analytics-stats">
          {stats.map((stat) => (
            <div
              className={`admin-stat-card admin-analytics-stat-${stat.type}`}
              key={stat.label}
            >
              <span>{stat.label}</span>

              <h2>{loading ? '—' : stat.value}</h2>

              <p>{loading ? 'Loading data...' : stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUBJECT PERFORMANCE */}
      <section className="admin-section admin-analytics-subjects">

        <div className="admin-section-heading">
          <div>
            <p className="admin-eyebrow">
              SUBJECT-WISE REPORT
            </p>

            <h2>Performance by subject</h2>

            <p className="admin-description">
              Compare average scores and attempts across all subjects.
            </p>
          </div>

          {!loading && (
            <span className="admin-section-caption">
              {subjects.length} subjects tracked
            </span>
          )}
        </div>

        {loading ? (
          <div className="admin-users-message">
            Loading subject analytics...
          </div>
        ) : rankedSubjects.length === 0 ? (
          <div className="admin-users-message">
            No quiz attempts recorded yet.
          </div>
        ) : (
          <div className="admin-analytics-subject-grid">
            {rankedSubjects.map((subject, index) => {
              const score = Math.min(
                100,
                Math.max(0, Number(subject.averageScore) || 0)
              )

              return (
                <div
                  className="admin-analytics-subject-card"
                  key={subject.subjectId}
                >
                  <div className="admin-analytics-subject-top">
                    <div>
                      <span className="admin-analytics-rank">
                        #{index + 1}
                      </span>

                      <h3>{subject.subject}</h3>
                    </div>

                    <span className="admin-analytics-attempt-count">
                      {subject.attempts} attempts
                    </span>
                  </div>

                  <div className="admin-analytics-score">
                    <strong>{subject.averageScore}%</strong>
                    <span>Average score</span>
                  </div>

                  <div className="admin-analytics-bar-track">
                    <div
                      className="admin-analytics-bar-fill"
                      style={{
                        width: `${score}%`
                      }}
                    />
                  </div>

                  <div className="admin-analytics-subject-footer">
                    <span>Highest score</span>
                    <strong>{subject.highestScore}%</strong>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* RECENT ACTIVITY */}
      <section className="admin-section admin-analytics-activity">

        <div className="admin-section-heading">
          <div>
            <p className="admin-eyebrow">
              ACTIVITY REPORT
            </p>

            <h2>Recent quiz submissions</h2>

            <p className="admin-description">
              Review the latest student assessment results.
            </p>
          </div>

          {!loading && (
            <span className="admin-section-caption">
              {recentAttempts.length} recent records
            </span>
          )}
        </div>

        {loading ? (
          <div className="admin-users-message">
            Loading recent activity...
          </div>
        ) : recentAttempts.length === 0 ? (
          <div className="admin-users-message">
            No recent submissions available.
          </div>
        ) : (
          <div className="admin-users-table-wrapper">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>SUBJECT</th>
                  <th>SCORE</th>
                  <th>RESULT</th>
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

export default AdminAnalytics
