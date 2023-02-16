import { createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = 'http://localhost:5000/api/auth'

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await fetch(`${baseUrl}/register`, options)
      const data = await response.json()
      if (response.status === 201) {
        return fulfillWithValue(data)
      }

      return rejectWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await fetch(`${baseUrl}/login`, options)
      const data = await response.json()

      if (response.status === 200) {
        return fulfillWithValue(data)
      }

      return rejectWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const setAccessToken = createAsyncThunk(
  'auth/setAccessToken',
  async ({ refreshToken }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await fetch(`${baseUrl}/token`, options)
      const data = await response.json()

      if (response.status === 200) {
        return fulfillWithValue(data)
      }

      return rejectWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
