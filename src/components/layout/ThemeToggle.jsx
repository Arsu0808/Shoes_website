import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      <span className="theme-toggle__track">
        <span className={`theme-toggle__thumb ${theme === 'dark' ? 'is-dark' : ''}`} />
      </span>
      <span className="theme-toggle__label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}

