import axios from 'axios';

const API_URL = '/api/compyling'; // Base URL for your Next.js API routes

const upload = (file: File, folderName: string) => {
  let formData = new FormData();
  formData.append('file', file);

  return axios.post(`${API_URL}/uploadImage/${folderName}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
};

const compileFile = (folderName: string) => {
  return axios.get(`${API_URL}/compileScreens/${folderName}`);
};

const UploadService = {
  upload,
  compileFile
};

export default UploadService;