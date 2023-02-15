import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser } from './authActions'

const tokens = localStorage.getItem('tokens')
  ? JSON.parse(localStorage.getItem('tokens'))
  : { accessToken: null, refreshToken: null }

const initialState = {
  tokens,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.error = null
      state.tokens = { accessToken: null, refreshToken: null }
    },
    setAccessToken: (state, { payload }) => {
      state.tokens.accessToken = payload.accessToken
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload

        state.isLoading = false
        state.isSuccess = true
        state.tokens = { accessToken, refreshToken }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.error = action.payload
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload

        state.isLoading = false
        state.isSuccess = true
        state.tokens = { accessToken, refreshToken }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.error = action.payload
      })
  },
})

export const { logoutUser, setAccessToken } = authSlice.actions

export default authSlice.reducer
