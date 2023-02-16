import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'
import authReducer from './auth/authSlice'
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
