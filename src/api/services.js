import { apiClient } from './client'

export const fetchServices = async (params = {}) => {
  const response = await apiClient.get('/services', { params })
  return response.data
}

export const fetchServiceBySlug = async (slug) => {
  const response = await apiClient.get(`/services/${slug}`)
  return response.data
}

export const fetchStaff = async (serviceId) => {
  const response = await apiClient.get('/staff', {
    params: serviceId ? { serviceId } : undefined,
  })
  return response.data
}

