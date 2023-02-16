import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:5000/api'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        return headers
      }
      headers.set('authorization', `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/user',
      providesTags: ['User'],
    }),
  }),
})

export const { useGetUserQuery } = apiSlice
