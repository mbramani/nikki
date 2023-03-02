import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_BASE_URL

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
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['User', 'Page'],
  endpoints: (_builder) => ({}),
})
