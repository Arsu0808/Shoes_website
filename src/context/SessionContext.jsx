import { createContext, useEffect, useState } from 'react'
import { fetchProfile, login as apiLogin, logout as apiLogout, register as apiRegister } from '../api/auth'
import { clearAuthTokens, getAccessToken } from '../api/client'

const SessionContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  reloadProfile: async () => {},
})

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const initialize = async () => {
      const token = getAccessToken()
      if (!token) {
        if (active) setLoading(false)
        return
      }
      try {
        const profile = await fetchProfile()
        if (active) setUser(profile)
      } catch (error) {
        clearAuthTokens()
        if (active) setUser(null)
        console.error('Unable to load profile', error)
      } finally {
        if (active) setLoading(false)
      }
    }
    initialize()
    return () => {
      active = false
    }
  }, [])

  const handleLogin = async (payload) => {
    try {
      const data = await apiLogin(payload)
      setUser(data.user)
      return data
    } catch (error) {
      console.error('Login error in SessionContext:', error)
      throw error
    }
  }

  const handleRegister = async (payload) => {
    try {
      const data = await apiRegister(payload)
      setUser(data.user)
      return data
    } catch (error) {
      console.error('Register error in SessionContext:', error)
      throw error
    }
  }

  const handleLogout = async () => {
    await apiLogout()
    setUser(null)
  }

  const reloadProfile = async () => {
    try {
      const profile = await fetchProfile()
      setUser(profile)
      return profile
    } catch (error) {
      clearAuthTokens()
      setUser(null)
      throw error
    }
  }

  return (
    <SessionContext.Provider
      value={{ user, loading, login: handleLogin, register: handleRegister, logout: handleLogout, reloadProfile }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export { SessionContext }

