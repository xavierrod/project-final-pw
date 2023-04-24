import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';

const Upload = () => {
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
  };

  return (
    <div>
      <h2>Upload Pictures</h2>
      <UploadForm onUpload={handleUpload} />
      {uploaded && <p>Upload successful!</p>}
    </div>
  );
};

export default Upload;
