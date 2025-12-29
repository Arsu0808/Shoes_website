import { apiClient } from './client'

export const cartApi = {
  getCart: async () => {
    const response = await apiClient.get('/cart')
    return response.data
  },

  addToCart: async (data) => {
    const response = await apiClient.post('/cart/add', data)
    return response.data
  },

  updateItem: async (itemId, quantity) => {
    const response = await apiClient.put(`/cart/item/${itemId}`, { quantity })
    return response.data
  },

  removeItem: async (itemId) => {
    const response = await apiClient.delete(`/cart/item/${itemId}`)
    return response.data
  },

  clearCart: async () => {
    const response = await apiClient.delete('/cart/clear')
    return response.data
  },
}

