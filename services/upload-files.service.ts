// services/upload-files.service.ts
import Error from '@/app/error';
import apiClient from './axiosConfig';


function generateRandomString(length: number) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    result += charset[randomIndex];
  }

  return result;
}


const upload = (file: string | Blob) => {
  let formData = new FormData();

  // Vérifie si DirectoryHashCode est défini dans le localStorage
  let DirectoryHashCode = window.localStorage.getItem('DirectoryHashCode');

  if (!DirectoryHashCode) {
    // Génère une chaîne aléatoire de 128 caractères
    DirectoryHashCode = generateRandomString(128);
    
    // Stocke la chaîne générée dans le localStorage
    window.localStorage.setItem('DirectoryHashCode', DirectoryHashCode);
  }

  // Affiche le DirectoryHashCode
  console.log(DirectoryHashCode);

  formData.append('file', file);

  return apiClient.post(`/api/uploadImage/${DirectoryHashCode}`, formData, 
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress(progressEvent) {
      // Progress callback, can be implemented if needed
    },
  });
};

const getFiles = () => {
  return apiClient.get('/api/files');
};

const UploadService = {
  upload,
  getFiles,
};

export default UploadService;