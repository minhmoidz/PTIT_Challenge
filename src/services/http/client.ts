import axios from 'axios';
import { env } from '@/config/env';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.',
        requestId: 'unknown',
      },
    });
  },
);
