import React from 'react';

function DropZone({ onDrop, files, handleImageClick }) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      style={{ border: '2px dashed black', padding: '20px' }}
    >
      <h2>Drop images here (max. 3)</h2>
      {files.map((fileObj) => (
        <button
          key={fileObj.name}
          onClick={() => handleImageClick(fileObj)}
          style={{ display: 'block', margin: '10px 0' }}
        >
          <img
            src={URL.createObjectURL(fileObj.file)}
            alt={fileObj.name}
            draggable='false'
            style={{ maxWidth: '100%' }}
          />
          {fileObj.name}
        </button>
      ))}
    </div>
  );
}

export default DropZone;
