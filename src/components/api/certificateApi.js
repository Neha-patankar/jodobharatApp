import axios from 'axios';
import { Base_url } from '../../apiConfig/api';

const BASE_URL = `${Base_url}/api/certificates`;

export const getAllCertificates = () => axios.get(BASE_URL);
export const deleteCertificate = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateCertificate = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
