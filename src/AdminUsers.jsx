
import { useEffect, useState } from 'react'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchUsers = async () => {
    const token = localStorage.getItem('electroqToken')

    setLoading(true)
    setError('')

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
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const students = users.filter((user) => user.role === 'user').length
  const admins = users.filter((user) => user.role === 'admin').length

  return (
    <div className="admin-main">
      <p className="admin-eyebrow">DATABASE / USERS</p>

      <h1>User Management</h1>

      <p className="admin-description">
        View and monitor all accounts registered on ELECTRO-Q.
      </p>

      {/* USER STATISTICS */}
      <section className="admin-stats">
        <div className="admin-stat-card">
          <span>TOTAL ACCOUNTS</span>
          <h2>{users.length}</h2>
          <p>All registered users</p>
        </div>

        <div className="admin-stat-card">
          <span>STUDENTS</span>
          <h2>{students}</h2>
          <p>Student accounts</p>
        </div>

        <div className="admin-stat-card">
          <span>ADMINISTRATORS</span>
          <h2>{admins}</h2>
          <p>Administrative accounts</p>
        </div>
      </section>

      {/* REGISTERED USERS */}
      <section className="admin-users-section">
        <div className="admin-users-heading">
          <div>
            <p className="admin-eyebrow">ACCOUNT DIRECTORY</p>
            <h2>Registered users</h2>
            <p>Account information and registration details.</p>
          </div>

          <button
            className="admin-refresh-button"
            onClick={fetchUsers}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh users'}
          </button>
        </div>

        {error && (
          <div className="admin-users-message admin-users-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="admin-users-message">
            Loading registered users...
          </div>
        ) : users.length === 0 && !error ? (
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
                    <td className="admin-user-name">
                      {user.name}
                    </td>

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
    </div>
  )
}

export default AdminUsers
