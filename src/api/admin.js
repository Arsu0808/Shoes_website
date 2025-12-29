import { apiClient } from './client'

export const fetchDashboard = async () => {
  const response = await apiClient.get('/admin/dashboard')
  return response.data
}

