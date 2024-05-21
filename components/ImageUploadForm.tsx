"use client"

import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image as File);

    try {
      const res = await axios.post('/api/uploadImage', formData);
      console.log(res.data);
      // You can perform other actions after the image is uploaded, for example, call the PDF conversion API with the uploaded image path.
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-5 mt-5 bg-violet-900 border-2 rounded-lg '>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUploadForm;