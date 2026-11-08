const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/db')

const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: '10kb' }))

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ELECTRO-Q Backend is running!'
  })
})

// Quiz routes
const quizRoutes = require('./routes/quizRoutes')
app.use('/api/quizzes', quizRoutes)

// Authentication routes
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

// Admin routes
const adminRoutes = require('./routes/adminRoutes')
app.use('/api/admin', adminRoutes)

// Invalid JSON handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON request body'
    })
  }
  next(err)
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  })
})

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

// Start server
const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`ELECTRO-Q server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Server startup failed:', error.message)
    process.exit(1)
  }
}

startServer()