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


export async function fetchCartItems () {
  const response = await apiClient.get('/cart');
  return response.data;
}
export async function calculateTotalPrice () {
  const response = await apiClient.get('/cart/total');
  return response.data;
}
export async function handleQuantityChange  (cartId: string, newQuantity: number) {
    const newData = { quantity: newQuantity };
    const response=  await apiClient.put('/cart', { cartId, newData });
    return response;
  };
  //   const handleQuantityChange = async (cartId: string, newQuantity: number) => {
//     const newData = { quantity: newQuantity };
//     try {
//       await apiClient.put('/cart', { cartId, newData });
//       fetchCartItems();
//       calculateTotalPrice();
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//     }
//   };

export async function  handleRemoveProduct  (productId: string)  {
      const response = await apiClient.delete(`/cart`, {
        data: { productId },
      });
      return response
  };
