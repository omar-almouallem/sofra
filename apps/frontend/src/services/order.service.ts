import axios from 'axios';

import { API_BASE_URL } from '../config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export async function  addOrder  (data: any)  {
      const response = await apiClient.post(`/order`, data );
      console.log(response)
      return response
  };

export async function  getOrders  ()  {
      const response = await apiClient.get(`/orders` );
      return response
  };
