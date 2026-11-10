
import { useEffect, useState } from 'react'

function AdminQuizManagement() {
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const [questions, setQuestions] = useState([])

  const [loading, setLoading] = useState(true)
  const [questionsLoading, setQuestionsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
    explanation: ''
  })

  const token = localStorage.getItem('electroqToken')

  const fetchSubjects = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        'https://electro-q-backend.onrender.com/api/quizzes'
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to load quiz subjects')
      }

      setSubjects(data.quizzes || [])

      if (data.quizzes?.length > 0) {
        setSelectedSubject((current) => current || data.quizzes[0].id)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchQuestions = async (subjectId = selectedSubject) => {
    if (!subjectId) return

    setQuestionsLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(
        `https://electro-q-backend.onrender.com/api/admin/questions/${subjectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to load questions')
      }

      setQuestions(data.questions || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setQuestionsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubjects()
  }, [])

  useEffect(() => {
    if (selectedSubject) {
      fetchQuestions(selectedSubject)
    }
  }, [selectedSubject])

  const totalQuestions = subjects.reduce(
    (total, subject) => total + (subject.questionCount || 0),
    0
  )

  const resetForm = () => {
    setFormData({
      question: '',
      options: ['', '', '', ''],
      answer: '',
      explanation: ''
    })

    setEditingQuestion(null)
    setShowForm(false)
  }

  const openAddForm = () => {
    setMessage('')
    setError('')
    setEditingQuestion(null)

    setFormData({
      question: '',
      options: ['', '', '', ''],
      answer: '',
      explanation: ''
    })

    setShowForm(true)
  }

  const openEditForm = (question) => {
    setMessage('')
    setError('')
    setEditingQuestion(question)

    setFormData({
      question: question.question,
      options: [...question.options],
      answer: question.answer,
      explanation: question.explanation || ''
    })

    setShowForm(true)
  }

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options]
    updatedOptions[index] = value

    setFormData({
      ...formData,
      options: updatedOptions
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setMessage('')

    if (!formData.question.trim()) {
      setError('Please enter the question.')
      return
    }

    if (
      formData.options.some((option) => !option.trim())
    ) {
      setError('Please fill in all four options.')
      return
    }

    if (!formData.answer) {
      setError('Please select the correct answer.')
      return
    }

    setSaving(true)

    try {
      const isEditing = Boolean(editingQuestion)

      const url = isEditing
        ? `https://electro-q-backend.onrender.com/api/admin/questions/${selectedSubject}/${editingQuestion.questionId}`
        : `https://electro-q-backend.onrender.com/api/admin/questions/${selectedSubject}`

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to save question')
      }

      resetForm()
      setMessage(data.message)
      await fetchQuestions(selectedSubject)
      await fetchSubjects()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (questionId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this question? This action cannot be undone.'
    )

    if (!confirmed) return

    setError('')
    setMessage('')

    try {
      const response = await fetch(
        `https://electro-q-backend.onrender.com/api/admin/questions/${selectedSubject}/${questionId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to delete question')
      }

      setMessage(data.message)
      await fetchQuestions(selectedSubject)
      await fetchSubjects()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="admin-main">
      <p className="admin-eyebrow">PLATFORM / QUIZ MANAGEMENT</p>

      <h1>Quiz Management</h1>

      <p className="admin-description">
        Manage the subjects and question banks available on ELECTRO-Q.
      </p>

      <section className="admin-stats">
        <div className="admin-stat-card">
          <span>TOTAL SUBJECTS</span>
          <h2>{subjects.length}</h2>
          <p>Available quiz categories</p>
        </div>

        <div className="admin-stat-card">
          <span>TOTAL QUESTIONS</span>
          <h2>{totalQuestions}</h2>
          <p>Questions in the question bank</p>
        </div>

        <div className="admin-stat-card">
          <span>SELECTED SUBJECT</span>
          <h2>{questions.length}</h2>
          <p>Questions in selected subject</p>
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-users-heading">
          <div>
            <p className="admin-eyebrow">QUESTION BANK</p>
            <h2>Manage questions</h2>
            <p>Select a subject to view and manage its questions.</p>
          </div>

          <button
            className="admin-refresh-button"
            onClick={() => fetchQuestions()}
            disabled={questionsLoading || !selectedSubject}
          >
            Refresh questions
          </button>
        </div>

        {loading ? (
          <div className="admin-users-message">
            Loading quiz subjects...
          </div>
        ) : (
          <>
            <div className="admin-management-card">
              <div>
                <h3>Select subject</h3>
                <p>Choose the question bank you want to manage.</p>
              </div>

              <select
                value={selectedSubject}
                onChange={(event) => setSelectedSubject(event.target.value)}
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subject}
                  </option>
                ))}
              </select>
            </div>

            {selectedSubject && (
              <div style={{ marginTop: '20px' }}>
                <button
                  className="admin-refresh-button"
                  onClick={openAddForm}
                >
                  + Add Question
                </button>
              </div>
            )}
          </>
        )}

        {error && (
          <div className="admin-users-message admin-users-error">
            {error}
          </div>
        )}

        {message && (
          <div className="admin-users-message">
            {message}
          </div>
        )}

        {showForm && (
          <div className="admin-section" style={{ marginTop: '24px' }}>
            <h2>
              {editingQuestion ? 'Edit Question' : 'Add New Question'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label>Question</label>
                <textarea
                  value={formData.question}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      question: event.target.value
                    })
                  }
                  required
                  rows="3"
                  style={{ width: '100%', padding: '12px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label>Options</label>

                {formData.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(event) =>
                      handleOptionChange(index, event.target.value)
                    }
                    required
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px',
                      marginTop: '10px'
                    }}
                  />
                ))}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label>Correct Answer</label>

                <select
                  value={formData.answer}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      answer: event.target.value
                    })
                  }
                  required
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px',
                    marginTop: '8px'
                  }}
                >
                  <option value="">Select correct answer</option>

                  {formData.options
                    .filter((option) => option.trim())
                    .map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label>Explanation</label>
                <textarea
                  value={formData.explanation}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      explanation: event.target.value
                    })
                  }
                  rows="3"
                  style={{ width: '100%', padding: '12px' }}
                />
              </div>

              <button
                type="submit"
                className="admin-refresh-button"
                disabled={saving}
              >
                {saving
                  ? 'Saving...'
                  : editingQuestion
                    ? 'Update Question'
                    : 'Save Question'}
              </button>

              <button
                type="button"
                className="admin-refresh-button"
                onClick={resetForm}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <div style={{ marginTop: '28px' }}>
          <h2>Questions</h2>

          {questionsLoading ? (
            <div className="admin-users-message">
              Loading questions...
            </div>
          ) : questions.length === 0 ? (
            <div className="admin-users-message">
              No questions found for this subject.
            </div>
          ) : (
            <div className="admin-performance-grid">
              {questions.map((question) => (
                <div
                  className="admin-performance-card"
                  key={question._id}
                >
                  <p className="admin-eyebrow">
                    QUESTION {question.questionId}
                  </p>

                  <h3>{question.question}</h3>

                  <div style={{ marginTop: '12px' }}>
                    {question.options.map((option, index) => (
                      <p key={index}>
                        {String.fromCharCode(65 + index)}. {option}
                        {option === question.answer ? ' âœ“' : ''}
                      </p>
                    ))}
                  </div>

                  {question.explanation && (
                    <p>
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                    <button
                      className="admin-refresh-button"
                      onClick={() => openEditForm(question)}
                    >
                      Edit
                    </button>

                    <button
                      className="admin-refresh-button"
                      onClick={() => handleDelete(question.questionId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default AdminQuizManagement

