// services/axiosConfig.ts
import axios from 'axios';

export const checkConnection = async () => {
  console.log("Checking connection");
  try {
    await axios.get('http://localhost:3003/api/files', { timeout: 50000 });
    return true;
  } catch (error) {
    console.log(error);
    
    return false;
  }
};


const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3003', // Assurez-vous de définir cette variable dans vos variables d'environnement
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;