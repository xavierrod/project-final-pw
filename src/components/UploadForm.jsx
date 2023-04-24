import React, { useState, useCallback } from 'react';
import useServer from '../hooks/useServer.js';
import { useDropzone } from 'react-dropzone';

const UploadForm = ({ onUpload }) => {
  const { post } = useServer();
  const [formData, setFormData] = useState({
    description: '',
    place: '',
    pictures: [],
  });

  const onDrop = (acceptedFiles) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pictures: [...prevFormData.pictures, ...acceptedFiles],
    }));
  };

  const removeFile = (file) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pictures: prevFormData.pictures.filter((prevFile) => prevFile !== file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await post({ url: '/entries', body: formData });
    setFormData({ description: '', place: '', pictures: [] });
    onUpload();
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </label>

      <label>
        Place:
        <input
          type='text'
          value={formData.place}
          onChange={(e) => setFormData({ ...formData, place: e.target.value })}
        />
      </label>

      <div className='dropzone' {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop</p>
      </div>

      <ul>
        {formData.pictures.map((file) => (
          <li key={file.name}>
            {file.name} - {file.size} bytes{' '}
            <button type='button' onClick={() => removeFile(file)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button type='submit'>Upload</button>
    </form>
  );
};

export default UploadForm;
