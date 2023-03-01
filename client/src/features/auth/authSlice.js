import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser, setAccessToken } from './authActions'
import { extendedApiSlice as userApi } from '../user/userSlice'

const accessTokenFromLocalStorage = localStorage.getItem('accessToken') || null
const refreshTokenFromLocalStorage = localStorage.getItem('refreshToken') || null

const initialState = {
  user: { name: null, email: null },
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
      state.user = { name: null, email: null }
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
        const { accessToken, refreshToken, name, email } = payload

        state.isLoading = false
        state.isSuccess = true
        state.tokens = { accessToken, refreshToken }
        state.user = { name, email }
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
        const { accessToken, refreshToken, name, email } = payload

        state.isLoading = false
        state.isSuccess = true
        state.tokens = { accessToken, refreshToken }
        state.user = { name, email }
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
        state.user = { name: null, email: null }
        state.tokens = { accessToken: null, refreshToken: null }
      })
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
        state.user = { ...payload }
      })
  },
})

export const { logoutUser } = authSlice.actions

export const selectUser = (state) => state.auth.user

export const selectTokens = (state) => state.auth.tokens

export default authSlice.reducer
