import { apiClient } from './client'

export const contactApi = {
  createContact: async (data) => {
    const response = await apiClient.post('/contact', data)
    return response.data
  },

  getContacts: async () => {
    const response = await apiClient.get('/contact')
    return response.data
  },

  updateContact: async (id, data) => {
    const response = await apiClient.put(`/contact/${id}`, data)
    return response.data
  },
}

