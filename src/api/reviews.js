import { apiClient } from './client'

export const reviewsApi = {
  createReview: async (data) => {
    const response = await apiClient.post('/reviews', data)
    return response.data
  },

  getReviews: async (shoeId) => {
    const response = await apiClient.get(`/reviews?shoe=${shoeId}`)
    return response.data
  },

  getAllReviews: async () => {
    const response = await apiClient.get('/reviews/all')
    return response.data
  },

  updateReview: async (id, data) => {
    const response = await apiClient.put(`/reviews/${id}`, data)
    return response.data
  },

  deleteReview: async (id) => {
    const response = await apiClient.delete(`/reviews/${id}`)
    return response.data
  },
}

