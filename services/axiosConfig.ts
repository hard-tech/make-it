// services/axiosConfig.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3003', // Assurez-vous de définir cette variable dans vos variables d'environnement
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;