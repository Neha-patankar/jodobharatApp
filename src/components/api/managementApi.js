import axios from 'axios';
import { Base_url } from '../../apiConfig/api';

const API_BASE = `${Base_url}/api/teammanagement`;

export const getAllMembers = () => axios.get(API_BASE);
export const createMember = (data) =>
  axios.post(API_BASE, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateMember = (id, data) =>
  axios.put(`${API_BASE}/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteMember = (id) => axios.delete(`${API_BASE}/${id}`);
