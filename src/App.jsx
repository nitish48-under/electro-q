
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Home'
import Quiz from './Quiz'
import Login from './Login'
import Register from './Register'

import AdminLayout from './AdminLayout'
import AdminOverview from './AdminOverview'
import AdminUsers from './AdminUsers'
import AdminAnalytics from './AdminAnalytics'
import AdminQuizManagement from './AdminQuizManagement'
import AdminSettings from './AdminSettings'

import StudentDashboard from './StudentDashboard'
import AttemptReview from './AttemptReview'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz/:subject" element={<Quiz />} />

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="quizzes" element={<AdminQuizManagement />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* STUDENT DASHBOARD */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route
          path="/dashboard/attempt/:attemptId"
          element={<AttemptReview />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

