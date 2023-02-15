import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../features/theme/themeSlice'

function App() {
  const theme = useSelector(selectTheme)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }

    return () => {
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('theme')
    }
  }, [theme])

  return <div className="App" />
}

export default App
