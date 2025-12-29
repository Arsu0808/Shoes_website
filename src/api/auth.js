import { apiClient, clearAuthTokens, getRefreshToken, setAuthToken } from './client'

const persistSession = (response) => {
  const { accessToken, refreshToken, ...rest } = response.data
  setAuthToken(accessToken, refreshToken)
  return { accessToken, refreshToken, ...rest }
}

export const register = async (payload) => {
  const response = await apiClient.post('/auth/register', payload)
  return persistSession(response)
}

export const login = async (payload) => {
  try {
    const response = await apiClient.post('/auth/login', payload)
    return persistSession(response)
  } catch (error) {
    console.error('Login API error:', error)
    throw error
  }
}

export const logout = async () => {
  const refreshToken = getRefreshToken()
  try {
    await apiClient.post('/auth/logout', { refreshToken })
  } finally {
    clearAuthTokens()
  }
}

export const fetchProfile = async () => {
  const response = await apiClient.get('/auth/me')
  return response.data
}

