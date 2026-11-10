
import { useEffect, useState } from 'react'
import {
  NavLink,
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom'
import './AdminLayout.css'

function AdminLayout() {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

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
          'https://electro-q-backend.onrender.com/api/admin/dashboard',
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
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    verifyAdmin()
  }, [navigate])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('electroqToken')
    localStorage.removeItem('electroqUser')
    navigate('/login')
  }

  const menuItems = [
    { label: 'Overview', path: '/admin', icon: 'â–¦', end: true },
    { label: 'User Management', path: '/admin/users', icon: 'â™™' },
    { label: 'Quiz Analytics', path: '/admin/analytics', icon: 'â–¥' },
    { label: 'Quiz Management', path: '/admin/quizzes', icon: 'â–¤' },
    { label: 'Settings', path: '/admin/settings', icon: 'âš™' }
  ]

  if (loading) {
    return (
      <div className="admin-loading">
        Verifying admin access...
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-loading">
        <h2>Access could not be verified</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/login')}>
          Return to login
        </button>
      </div>
    )
  }

  if (!admin) return null

  return (
    <div className="admin-layout">
      <button
        className={`admin-sidebar-backdrop ${sidebarOpen ? 'visible' : ''}`}
        aria-label="Close navigation menu"
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
      >
        <NavLink to="/" className="admin-sidebar-logo">
          ELECTRO<span>-Q</span>
        </NavLink>

        <div className="admin-sidebar-label">
          MAIN MENU
        </div>

        <nav className="admin-sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `admin-sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="admin-sidebar-icon">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-profile">
            <div className="admin-avatar">
              {admin.name?.charAt(0).toUpperCase()}
            </div>

            <div className="admin-profile-info">
              <strong>{admin.name}</strong>
              <span>Administrator</span>
            </div>
          </div>

          <button
            className="admin-sidebar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? 'âœ•' : 'â˜°'}
            </button>

            <div className="admin-topbar-heading">
              <span>ADMINISTRATION</span>
              <strong>Control Panel</strong>
            </div>
          </div>

          <div className="admin-topbar-user">
            <div className="admin-topbar-avatar">
              {admin.name?.charAt(0).toUpperCase()}
            </div>
            <span>Welcome, {admin.name}</span>
          </div>
        </header>

        <main className="admin-page-content">
          <div
            key={location.pathname}
            className="admin-route-transition"
          >
            <Outlet context={{ admin }} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

