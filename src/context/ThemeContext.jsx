import { createContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

const THEME_STORAGE_KEY = 'solestyle-theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem(THEME_STORAGE_KEY) || 'dark'
  })

  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { ThemeContext }

