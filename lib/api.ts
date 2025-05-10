import axios from 'axios'
import { parseCookies } from 'nookies'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // importante para enviar cookies
})

api.interceptors.request.use(
  (config) => {
    const cookies = parseCookies()

    const accessToken = cookies['access_token']
    const refreshToken = cookies['refresh_token']

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    // Se quiser enviar o refreshToken também como header (opcional)
    if (refreshToken) {
      config.headers['x-refresh-token'] = refreshToken
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
