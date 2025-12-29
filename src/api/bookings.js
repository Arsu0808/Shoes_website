import { apiClient } from './client'

export const createBooking = async (payload) => {
  const response = await apiClient.post('/bookings', payload)
  return response.data
}

export const fetchBookings = async () => {
  const response = await apiClient.get('/bookings')
  return response.data
}

export const updateBookingStatus = async (bookingId, payload) => {
  const response = await apiClient.patch(`/bookings/${bookingId}/status`, payload)
  return response.data
}

