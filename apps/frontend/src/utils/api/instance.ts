import { notifications } from '@mantine/notifications';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      notifications.show({
        title: 'Произошла ошибка',
        message: error.response.data.message,
        color: 'red'
      });
    }
    return Promise.reject(error);
  }
);
