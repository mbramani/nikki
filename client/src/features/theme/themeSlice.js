import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.value === 'dark') {
        state.value = 'light'
      } else {
        state.value = 'dark'
      }
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export const selectTheme = (state) => state.theme.value

export default themeSlice.reducer
