
import { createSlice } from '@reduxjs/toolkit'

const savedUser = localStorage.getItem('electroqUser')
const savedToken = localStorage.getItem('electroqToken')

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  isAuthenticated: Boolean(savedToken)
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },

    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    }
  }
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer

