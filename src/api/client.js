import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
const ACCESS_TOKEN_KEY = 'solestyle_token'
const REFRESH_TOKEN_KEY = 'solestyle_refresh_token'

export const getAccessToken = () => window.localStorage.getItem(ACCESS_TOKEN_KEY)
export const getRefreshToken = () => window.localStorage.getItem(REFRESH_TOKEN_KEY)

export const setAuthToken = (accessToken, refreshToken) => {
  if (accessToken) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  } else {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  if (typeof refreshToken !== 'undefined') {
    if (refreshToken) {
      window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    } else {
      window.localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
  }
}

export const clearAuthTokens = () => {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: false,
})

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshPromise = null

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    const refreshToken = getRefreshToken()
    if (!refreshToken) return null
    refreshPromise = axios.post(`${API_URL}/auth/refresh`, { refreshToken })
  }

  try {
    const response = await refreshPromise
    const { accessToken, refreshToken } = response.data
    setAuthToken(accessToken, refreshToken)
    return accessToken
  } finally {
    refreshPromise = null
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status

    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true
      try {
        const newAccessToken = await refreshAccessToken()
        if (!newAccessToken) {
          clearAuthTokens()
          return Promise.reject(error)
        }
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        clearAuthTokens()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

