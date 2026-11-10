
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_URL = 'https://electro-q-backend.onrender.com/api/quizzes'

// Fetch questions from the Express backend
export const fetchQuizQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async (subject, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/${encodeURIComponent(subject)}`
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        return rejectWithValue(
          data.message || 'Unable to load quiz.'
        )
      }

      return data.questions.map((item) => ({
        id: item.id,
        question: item.question,
        options: item.options
      }))
    } catch (error) {
      return rejectWithValue(
        'Cannot connect to the backend. Check that the server is running.'
      )
    }
  }
)

const initialState = {
  subjects: [],
  questions: [],
  loading: false,
  error: null
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload
    },

    setQuestions: (state, action) => {
      state.questions = action.payload
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setError: (state, action) => {
      state.error = action.payload
    },

    clearQuiz: (state) => {
      state.questions = []
      state.loading = false
      state.error = null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.loading = true
        state.error = null
        state.questions = []
      })

      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.loading = false
        state.questions = action.payload
      })

      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong.'
      })
  }
})

export const {
  setSubjects,
  setQuestions,
  setLoading,
  setError,
  clearQuiz
} = quizSlice.actions

export default quizSlice.reducer

