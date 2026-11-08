
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'

function AdminDashboard() {
  const [admin, setAdmin] = useState(null)
  const [users, setUsers] = useState([])
  const [analytics, setAnalytics] = useState(null)

  const [error, setError] = useState('')
  const [usersError, setUsersError] = useState('')
  const [analyticsError, setAnalyticsError] = useState('')

  const [loading, setLoading] = useState(true)
  const [usersLoading, setUsersLoading] = useState(false)

  const navigate = useNavigate()

  const fetchUsers = async (token) => {
    setUsersLoading(true)
    setUsersError('')

    try {
      const response = await fetch(
        'http://localhost:5000/api/admin/users',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to load users')
      }

      setUsers(data.users || [])
    } catch (err) {
      setUsersError(err.message)
    } finally {
      setUsersLoading(false)
    }
  }

  const fetchAnalytics = async (token) => {
    setAnalyticsError('')

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
      setAnalyticsError(err.message)
    }
  }

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem('electroqToken')
      const savedUser = localStorage.getItem('electroqUser')

      if (!token || !savedUser) {
        navigate('/login')
        return
      }

      try {
        const user = JSON.parse(savedUser)

        if (user.role !== 'admin') {
          navigate('/')
          return
        }

        const response = await fetch(
          'http://localhost:5000/api/admin/dashboard',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Access denied')
        }

        setAdmin(data.admin)

        await Promise.all([
          fetchUsers(token),
          fetchAnalytics(token)
        ])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    verifyAdmin()
  }, [navigate])

  const handleRefresh = () => {
    const token = localStorage.getItem('electroqToken')

    if (token) {
      fetchUsers(token)
      fetchAnalytics(token)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('electroqToken')
    localStorage.removeItem('electroqUser')
    navigate('/login')
  }

  if (loading) {
    return <div className="admin-loading">Verifying admin access...</div>
  }

  if (error) {
    return (
      <div className="admin-loading">
        <h2>Access could not be verified</h2>
        <p>{error}</p>
        <Link to="/">Return home</Link>
      </div>
    )
  }

  if (!admin) return null

  return (
    <div className="admin-page">
      <header className="admin-navbar">
        <Link to="/" className="admin-logo">
          ELECTRO<span>-Q</span>
        </Link>

        <div className="admin-nav-right">
          <span>ADMIN PANEL</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="admin-main">
        <p className="admin-eyebrow">ADMINISTRATION / OVERVIEW</p>

        <h1>
          Welcome back, <span>{admin.name}</span>.
        </h1>

        <p className="admin-description">
          Manage your ELECTRO-Q assessment platform from here.
        </p>

        {/* PLATFORM STATISTICS */}
        <section className="admin-stats">
          <div className="admin-stat-card">
            <span>TOTAL USERS</span>
            <h2>{analytics ? analytics.users.total : '—'}</h2>
            <p>Registered accounts</p>
          </div>

          <div className="admin-stat-card">
            <span>STUDENTS</span>
            <h2>{analytics ? analytics.users.students : '—'}</h2>
            <p>Student accounts</p>
          </div>

          <div className="admin-stat-card">
            <span>QUIZ ATTEMPTS</span>
            <h2>{analytics ? analytics.performance.totalAttempts : '—'}</h2>
            <p>Total submissions</p>
          </div>

          <div className="admin-stat-card">
            <span>AVERAGE SCORE</span>
            <h2>
              {analytics ? `${analytics.performance.averageScore}%` : '—'}
            </h2>
            <p>Across all student attempts</p>
          </div>

          <div className="admin-stat-card">
            <span>QUIZ SUBJECTS</span>
            <h2>{analytics ? analytics.quizzes.totalSubjects : '—'}</h2>
            <p>
              {analytics
                ? `${analytics.quizzes.totalQuestions} questions available`
                : 'Question bank'}
            </p>
          </div>

          <div className="admin-stat-card">
            <span>HIGHEST SCORE</span>
            <h2>
              {analytics ? `${analytics.performance.highestScore}%` : '—'}
            </h2>
            <p>Best recorded result</p>
          </div>
        </section>

        {analyticsError && (
          <div className="admin-users-message admin-users-error">
            Analytics: {analyticsError}
          </div>
        )}

        {/* SUBJECT PERFORMANCE */}
        <section className="admin-section">
          <p className="admin-eyebrow">ACADEMIC / PERFORMANCE</p>
          <h2>Subject performance</h2>

          {!analytics ? (
            <div className="admin-users-message">
              Loading subject performance...
            </div>
          ) : analytics.subjectPerformance.length === 0 ? (
            <div className="admin-users-message">
              No quiz attempts recorded yet.
            </div>
          ) : (
            <div className="admin-performance-grid">
              {analytics.subjectPerformance.map((subject) => (
                <div className="admin-performance-card" key={subject.subjectId}>
                  <h3>{subject.subject}</h3>

                  <div className="admin-performance-numbers">
                    <strong>{subject.averageScore}%</strong>
                    <span>{subject.attempts} attempts</span>
                  </div>

                  <div className="admin-performance-track">
                    <div
                      style={{
                        width: `${subject.averageScore}%`
                      }}
                    />
                  </div>

                  <p>
                    Highest score: {subject.highestScore}%
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RECENT ACTIVITY */}
        <section className="admin-section">
          <p className="admin-eyebrow">PLATFORM / ACTIVITY</p>
          <h2>Recent quiz activity</h2>

          {!analytics ? (
            <div className="admin-users-message">
              Loading recent activity...
            </div>
          ) : analytics.recentAttempts.length === 0 ? (
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
                  {analytics.recentAttempts.map((attempt) => (
                    <tr key={attempt._id}>
                      <td className="admin-user-name">
                        {attempt.user?.name || 'Unknown user'}
                      </td>
                      <td>{attempt.subject}</td>
                      <td>
                        {attempt.score}/{attempt.totalQuestions}
                      </td>
                      <td>{attempt.percentage}%</td>
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

        {/* QUIZ MANAGEMENT */}
        <section className="admin-section">
          <p className="admin-eyebrow">QUICK ACCESS</p>
          <h2>Platform management</h2>

          <div className="admin-management-card">
            <div>
              <h3>Quiz Management</h3>
              <p>Manage subjects and question banks.</p>
            </div>
            <span>COMING SOON</span>
          </div>
        </section>

        {/* USER MANAGEMENT */}
        <section className="admin-users-section">
          <div className="admin-users-heading">
            <div>
              <p className="admin-eyebrow">DATABASE / USERS</p>
              <h2>Registered users</h2>
              <p>View accounts registered on ELECTRO-Q.</p>
            </div>

            <button
              className="admin-refresh-button"
              onClick={handleRefresh}
              disabled={usersLoading}
            >
              {usersLoading ? 'Refreshing...' : 'Refresh dashboard'}
            </button>
          </div>

          {usersError && (
            <div className="admin-users-message admin-users-error">
              {usersError}
            </div>
          )}

          {usersLoading && users.length === 0 ? (
            <div className="admin-users-message">
              Loading registered users...
            </div>
          ) : users.length === 0 && !usersError ? (
            <div className="admin-users-message">
              No registered users found.
            </div>
          ) : (
            <div className="admin-users-table-wrapper">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>USER</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>REGISTERED</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="admin-user-name">{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`admin-role-badge admin-role-${user.role}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard
