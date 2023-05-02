import React from 'react';
import { useNavigate } from 'react-router-dom';

import useServer from '../hooks/useServer.js';
import styles from './UploadForm.module.css';

function UploadForm() {
  const { post } = useServer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { data } = await post({
      url: '/entries',
      body: formData,
      hasImage: true,
    });
    if (data.status === 'ok') navigate('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__field}>
        <label className={styles.form__label} htmlFor='place'>
          Lugar
        </label>
        <input
          className={styles.form__input}
          type='text'
          name='place'
          id='place'
          required
        />
      </div>
      <div className={styles.form__field}>
        <label className={styles.form__label} htmlFor='description'>
          Descripción
          <textarea
            className={styles.form__input}
            name='description'
            id='description'
          />
        </label>
      </div>
      <div className={styles.form__field}>
        <label className={styles.form__label} htmlFor='files'>
          Fotos
          <input
            className={styles.form__input}
            type='file'
            name={`file1`}
            id='file1'
            accept='image/*'
          />
          <input
            className={styles.form__input}
            type='file'
            name={`file2`}
            id='file2'
            accept='image/*'
          />
          <input
            className={styles.form__input}
            type='file'
            name={`file3`}
            id='file3'
            accept='image/*'
          />
        </label>
      </div>

      <button type='submit'>Postear</button>
    </form>
  );
}
export default UploadForm;

/* DROZONE
function UploadForm() {
  const { post } = useServer();

  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = [...files];
    const filesToAdd = e.dataTransfer.files;
    for (let i = 0; i < filesToAdd.length && newFiles.length < 3; i++) {
      const file = filesToAdd[i];
      const name = `file${newFiles.length + 1}`;
      newFiles.push({ file, name });
    }
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    files.forEach((fileObj) => {
      formData.append(fileObj.name, fileObj.file);
    });
    const localUser = JSON.parse(localStorage.getItem('user')) || {};
    try {
      const response = await post({
        url: '/entries',
        body: formData,
        token: localUser.token,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (fileObj) => {
    const editor = document.querySelector('#editor');
    const img = document.createElement('img');
    img.src = URL.createObjectURL(fileObj.file);
    img.alt = fileObj.name;
    editor.appendChild(img);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__field}>
        <label className={styles.form__label} htmlFor='place'>
          Lugar
        </label>
        <input
          className={styles.form__input}
          type='text'
          name='place'
          id='place'
          required
        />
      </div>
      <div className={styles.form__field}>
        <label className={styles.form__label} htmlFor='description'>
          Descripción
          <textarea
            className={styles.form__input}
            name='description'
            id='description'
          />
        </label>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{ border: "2px dashed black", padding: "20px" }}
      >
        <h2>Drop images here (max. 3)</h2>
        {files.map((fileObj) => (
          <button
            key={fileObj.name}
            onClick={() => handleImageClick(fileObj)}
            style={{ display: "block", margin: "10px 0" }}
          >
            <img
              src={URL.createObjectURL(fileObj.file)}
              alt={fileObj.name}
              draggable="false"
              style={{ maxWidth: "100%" }}
            />
            {fileObj.name}
          </button>
        ))}
      </div>

      <button type='submit'>Postear</button>
    </form>
  );
}
export default UploadForm; */

/* 
function UploadForm() {
  const { post } = useServer();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    const localUser = JSON.parse(localStorage.getItem('user')) || {};

    try {
      console.log(formData);

      const response = await post({
        url: '/entries',
        body: formData,
        token: localUser.token,
      });

      // server response
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__field}>
        <label className={styles.form__label} htmlFor='place'>
          Lugar
        </label>
        <input
          className={styles.form__input}
          type='text'
          name='place'
          id='place'
          required
        />
      </div>
      <div className={styles.form__field}>
        <label className={styles.form__label} htmlFor='description'>
          Descripción
          <textarea
            className={styles.form__input}
            name='description'
            id='description'
          />
        </label>
      </div>
      <div className={styles.form__field}>
        <label className={styles.form__label} htmlFor='files'>
          Fotos
          <input
            className={styles.form__input}
            type='file'
            name='files'
            id='files'
            accept='image/*'
            multiple
            max='3'
            
          />
        </label>
      </div>

      <button type='submit'>Postear</button>
    </form>
  );
}
export default UploadForm;
 */
