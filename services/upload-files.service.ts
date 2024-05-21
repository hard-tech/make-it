// services/upload-files.service.ts
import apiClient from './axiosConfig';

const upload = (file: File, onUploadProgress: (progressEvent: ProgressEvent) => void) => {
  let formData = new FormData();
  formData.append('file', file);

  return apiClient.post('/api/uploadImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress(progressEvent) {
        
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
