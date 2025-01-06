import axios from 'axios';
import { IBasicLoginInput, IBasicSignupInput } from '@sofra/types';

import { API_BASE_URL } from '../config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function BasicSignup (data: IBasicSignupInput) {
  const response = await apiClient.post('/signup/basic', data);
  return response;
}

export async function BasicLogin (data: IBasicLoginInput) {
  const response = await apiClient.post('/login/basic', data);
  if (response.data.accessToken) {
    localStorage.setItem('accessToken', response.data.accessToken);
  } else {
    throw new Error('No access token returned');
  }
  return response;
}


export async function CreateAdmin (data: IBasicSignupInput) {
  const response = await apiClient.post('/create/admin', data);
  return response;
}