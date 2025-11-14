// src/api/aboutApi.js
import axios from 'axios';
import { Base_url } from '../../apiConfig/api';

const API_BASE = `${Base_url}/api/about`;

export const createAbout = (data) => axios.post(API_BASE, data);
export const getAllAbout = () => axios.get(API_BASE);
export const updateAbout = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteAbout = (id) => axios.delete(`${API_BASE}/${id}`);
