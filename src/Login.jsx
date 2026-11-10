import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Login.css'

function Login() {
  const [role, setRole] = useState('user')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('https://electro-q-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed')
      }

      if (data.user.role !== role) {
        throw new Error(`This account does not have ${role} access.`)
      }

      localStorage.setItem('electroqToken', data.token)
      localStorage.setItem('electroqUser', JSON.stringify(data.user))

      navigate(data.user.role === 'admin' ? '/admin' : '/')
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Cannot connect to the server. Please try again.'
          : err.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <Link to="/" className="login-back">? Back to Home</Link>

        <p className="login-brand">ELECTRO-Q</p>
        <p className="login-label">QUIZ & ASSESSMENT PLATFORM</p>

        <h1>Welcome back.</h1>
        <p className="login-subtitle">
          Sign in to continue your ECE learning journey.
        </p>

        {location.state?.registered && (
          <p className="login-success">
            Account created successfully! Please sign in.
          </p>
        )}

        <div className="login-role-switch">
          <button
            type="button"
            className={role === 'user' ? 'active' : ''}
            onClick={() => {
              setRole('user')
              setError('')
            }}
          >
            User
          </button>

          <button
            type="button"
            className={role === 'admin' ? 'active' : ''}
            onClick={() => {
              setRole('admin')
              setError('')
            }}
          >
            Admin
          </button>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="login-error" role="alert">{error}</p>
          )}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading
              ? 'Signing in...'
              : role === 'admin'
                ? 'Login as Admin'
                : 'Login as User'}
            <span>?</span>
          </button>
        </form>

        <p className="login-register">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </section>
    </main>
  )
}

export default Login

