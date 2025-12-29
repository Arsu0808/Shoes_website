import { apiClient } from './client'

export const ordersApi = {
  createOrder: async (data) => {
    const response = await apiClient.post('/orders', data)
    return response.data
  },

  getOrders: async () => {
    const response = await apiClient.get('/orders')
    return response.data
  },

  getAllOrders: async () => {
    const response = await apiClient.get('/orders/all')
    return response.data
  },

  getOrder: async (id) => {
    const response = await apiClient.get(`/orders/${id}`)
    return response.data
  },

  updateOrderStatus: async (id, data) => {
    const response = await apiClient.put(`/orders/${id}/status`, data)
    return response.data
  },
}

