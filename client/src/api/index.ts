import axios from 'axios'
import { BASE_URL } from '../../constants'

import type { AxiosInstance } from 'axios'

const httpClient: AxiosInstance = axios.create({ baseURL: BASE_URL })

httpClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

httpClient.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem('accessToken')

      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default httpClient
