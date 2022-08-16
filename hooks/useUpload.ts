import axios from 'axios';
import { useState } from 'react';

export const useUpload = (url: string) => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadForm = async (formData: FormData) => {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const newProgress = (progressEvent.loaded / progressEvent.total) * 100;
        setProgress(Math.round(newProgress));
      },
    });
    setUploadSuccess(true);
    return response;
  };

  return { uploadForm, uploadSuccess, setUploadSuccess, progress };
};
