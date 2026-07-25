import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function normalizeApiError(error) {
  if (error?.response) {
    return {
      message: error.response.data?.message || error.response.data?.error || 'Request failed',
      status: error.response.status,
      code: error.code || 'REQUEST_FAILED',
      details: error.response.data || null,
    }
  }

  if (error?.request) {
    return {
      message: 'No response received from the server.',
      status: null,
      code: error.code || 'NO_RESPONSE',
      details: null,
    }
  }

  return {
    message: error?.message || 'Unexpected request failure.',
    status: null,
    code: error?.code || 'UNKNOWN_ERROR',
    details: null,
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error)),
)
