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
      <div className={styles.container}>

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

      <button className={styles.button} type='submit'>Postear</button>
    </form>
      </div>

  );
}
export default UploadForm;
