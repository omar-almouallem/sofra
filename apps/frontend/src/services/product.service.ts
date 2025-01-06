import axios from 'axios';

import { API_BASE_URL } from '../config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const getProducts = async () => {
  const response = await apiClient.get(`${API_BASE_URL}/producte/all`);
  return response;
};

export const deleteProducts = async (id: string) => {
  await apiClient.delete(`${API_BASE_URL}/producte/delete/${id}`);
};

export const updateProducts = async (
  id: string,
  updatedData: Partial<Product>,
) => {
  const response = await apiClient.put(
    `${API_BASE_URL}/producte/update/${id}`,
    updatedData,
  );
  return response.data;
};

export const addProduct = async (productData: Partial<Product>) => {
  const response = await apiClient.post(
    `${API_BASE_URL}/producte/create`,
    productData,
  );
  return response.data;
};
