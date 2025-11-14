


// src/components/api/clientApi.js
import axios from 'axios';
import { Base_url } from '../../apiConfig/api';

const API_BASE = `${Base_url}/api/clients`;

// ✅ GET all clients
export const getAllClients = () => axios.get(`${API_BASE}/`);

// ✅ ADD client with image
export const addClient = (formData) =>
  axios.post(`${API_BASE}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// ✅ UPDATE client by ID
export const updateClient = (id, formData) =>
  axios.put(`${API_BASE}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// ✅ DELETE client by ID
export const deleteClient = (id) => axios.delete(`${API_BASE}/${id}`);
