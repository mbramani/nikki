import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser, setAccessToken } from './authActions'

const accessTokenFromLocalStorage = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null
const refreshTokenFromLocalStorage = localStorage.getItem('refreshToken')
  ? localStorage.getItem('refreshToken')
  : null

const initialState = {
  tokens: {
    accessToken: accessTokenFromLocalStorage,
    refreshToken: refreshTokenFromLocalStorage,
  },
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
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { accessToken, refreshToken } = payload

        state.isLoading = false
        state.isSuccess = true
        state.tokens = { accessToken, refreshToken }
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.error = payload
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { accessToken, refreshToken } = payload

        state.isLoading = false
        state.isSuccess = true
        state.tokens = { accessToken, refreshToken }
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.error = payload
      })
      .addCase(setAccessToken.fulfilled, (state, { payload }) => {
        state.tokens.accessToken = payload.accessToken
      })
      .addCase(setAccessToken.rejected, (state) => {
        state.tokens = { accessToken: null, refreshToken: null }
      })
  },
})

export const { logoutUser } = authSlice.actions

export default authSlice.reducer