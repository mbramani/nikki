import { apiSlice } from '../api/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/user',
      providesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: ({ name, email }) => ({
        url: '/user',
        method: 'PATCH',
        body: { name, email },
      }),
      invalidatesTags: ['User'],
    }),

    updateUserPassword: builder.mutation({
      query: ({ newPassword }) => ({
        url: '/user/update-password',
        method: 'PATCH',
        body: { newPassword },
      }),
      invalidatesTags: ['User'],
    }),

    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: '/user/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),

    resetUserPassword: builder.mutation({
      query: ({ resetToken, newPassword }) => ({
        url: '/user/reset-password',
        method: 'POST',
        body: { resetToken, newPassword },
      }),
    }),
  }),
})

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useForgotPasswordMutation,
  useResetUserPasswordMutation,
} = extendedApiSlice
