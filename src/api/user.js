import api from './axiosConfig'

export const getAllUsers = async (payload) => {
  try {
    const response = await api.get('/api/users', payload)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
