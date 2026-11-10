
import { useOutletContext, useNavigate } from 'react-router-dom'

function AdminSettings() {
  const { admin } = useOutletContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('electroqToken')
    localStorage.removeItem('electroqUser')
    navigate('/login')
  }

  return (
    <div className="admin-main">
      <p className="admin-eyebrow">PLATFORM / CONFIGURATION</p>

      <h1>Settings</h1>

      <p className="admin-description">
        View your administrator account and ELECTRO-Q platform information.
      </p>

      {/* ADMIN PROFILE */}
      <section className="admin-section">
        <p className="admin-eyebrow">ACCOUNT / PROFILE</p>
        <h2>Administrator profile</h2>

        <div className="admin-settings-card">
          <div className="admin-settings-profile">
            <div className="admin-avatar admin-settings-avatar">
              {admin?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3>{admin?.name || 'Administrator'}</h3>
              <span>Platform Administrator</span>
            </div>
          </div>

          <div className="admin-settings-details">
            <div>
              <span>NAME</span>
              <strong>{admin?.name || 'â€”'}</strong>
            </div>

            <div>
              <span>EMAIL ADDRESS</span>
              <strong>{admin?.email || 'Not available'}</strong>
            </div>

            <div>
              <span>ACCOUNT ROLE</span>
              <strong className="admin-settings-role">ADMIN</strong>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM INFORMATION */}
      <section className="admin-section">
        <p className="admin-eyebrow">SYSTEM / INFORMATION</p>
        <h2>Platform information</h2>

        <div className="admin-settings-card">
          <div className="admin-settings-details">
            <div>
              <span>PLATFORM NAME</span>
              <strong>ELECTRO-Q</strong>
            </div>

            <div>
              <span>PLATFORM TYPE</span>
              <strong>ECE Quiz & Assessment Platform</strong>
            </div>

            <div>
              <span>FRONTEND</span>
              <strong>React + Vite</strong>
            </div>

            <div>
              <span>BACKEND</span>
              <strong>Node.js + Express</strong>
            </div>

            <div>
              <span>DATABASE</span>
              <strong>MongoDB Atlas</strong>
            </div>

            <div>
              <span>ADMIN PANEL</span>
              <strong className="admin-settings-status">ACTIVE</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SESSION */}
      <section className="admin-section">
        <p className="admin-eyebrow">SECURITY / SESSION</p>
        <h2>Session management</h2>

        <div className="admin-settings-card admin-settings-session">
          <div>
            <h3>Administrator session</h3>
            <p>
              Sign out of your administrator account on this device.
            </p>
          </div>

          <button
            className="admin-settings-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  )
}

export default AdminSettings

