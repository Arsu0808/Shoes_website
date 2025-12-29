import { apiClient } from './client'

export const shoesApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await apiClient.get(`/shoes?${queryString}`)
    return response.data
  },

  getBySlug: async (slug) => {
    const response = await apiClient.get(`/shoes/${slug}`)
    return response.data
  },

  getMinPrices: async () => {
    const response = await apiClient.get('/shoes/min-prices')
    return response.data
  },
}

