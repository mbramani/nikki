import { apiSlice } from '../api/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPages: builder.query({
      query: () => '/page',
    }),
    getPage: builder.query({
      query: ({ year, month, day }) => `/page/${year}/${month}/${day}`,
      providesTags: (_result, _error, arg) => [{ type: 'Page', id: arg }],
    }),

    addPage: builder.mutation({
      query: ({ year, month, day, data = '' }) => ({
        url: `/page/${year}/${month}/${day}`,
        method: 'POST',
        body: { data },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Page', id: arg.id }],
    }),

    updatePage: builder.mutation({
      query: ({ year, month, day, data }) => ({
        url: `/page/${year}/${month}/${day}`,
        method: 'PATCH',
        body: { data },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Page', id: arg.id }],
    }),
  }),
})

export const {
  useGetAllPagesQuery,
  useGetPageQuery,
  useAddPageMutation,
  useUpdatePageMutation,
} = extendedApiSlice
