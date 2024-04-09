import api from './api/axiosInterceptor'

export const login = async (payload) => {
  try {
    const response = await api.post('/auth/login', payload)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
