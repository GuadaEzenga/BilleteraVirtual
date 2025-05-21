import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Cambiar a la URL de la API real

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getTransfers = async () => {
  const response = await api.get('/transfers');
  return response.data;
};

export const createTransfer = async (data) => {
  const response = await api.post('/transfers', data);
  return response.data;
};

export const getTransferById = async (id) => {
  const response = await api.get(`/transfers/${id}`);
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await api.get(`/users?search=${query}`);
  return response.data;
};