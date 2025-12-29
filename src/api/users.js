import { apiClient } from './client'

export const usersApi = {
  getAllUsers: async () => {
    const response = await apiClient.get('/users')
    return response.data
  },

  getUser: async (userId) => {
    const response = await apiClient.get(`/users/${userId}`)
    return response.data
  },

  getUserOrders: async (userId) => {
    const response = await apiClient.get(`/users/${userId}/orders`)
    return response.data
  },

  updateProfile: async (data) => {
    const response = await apiClient.put('/users/me', data)
    return response.data
  },
}

// Named export for backward compatibility
export const updateProfile = async (data) => {
  const response = await apiClient.put('/users/me', data)
  return response.data
}
