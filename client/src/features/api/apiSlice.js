import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:5000/api'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = getState().auth.tokens
      if (!accessToken) {
        return headers
      }
      headers.set('authorization', `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ['User', 'Page'],
  endpoints: (_builder) => ({}),
})
