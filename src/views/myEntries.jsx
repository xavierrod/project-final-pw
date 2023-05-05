import { useState, useEffect } from 'react';
import useServer from '../hooks/useServer';
import useAuth from '../hooks/useAuth';

import { apiURL } from '../config';
import styles from './myEntries.module.css';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function MyEntries({ token }) {
  const { get, delete: destroy } = useServer();
  const [entries, setEntries] = useState([]);
  const { user } = useAuth();

  const getEntries = async () => {
    const { data } = await get({ url: '/entries' });
    const userEntries = data.data.filter((entry) => entry.user_id === user.id);
    setEntries(userEntries);
  };

  const handleDelete = async (id) => {
    await destroy({ url: `/entries/${id}` });
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleEdit = () => {}

  useEffect(() => {
    console.log(entries);
    getEntries();
  }, []);
    return (

  <div className={styles.container}>
  <h1>Mis Publicaciones</h1>
  <ul className={styles.entries}>
  {entries.map((data) => {
    return (
      <li className={styles.entrie} key={data.id}>
        <div className={styles.entrie__image_container}>
          {data.photo &&
            data.photo.map((photo) => {
              return (
                <img
                  src={`${apiURL}/${photo.photo}`}
                  key={photo.photo}
                  className={styles.entries__image}
                />
              );
            })}
        </div>
        <div className={styles.entrie__content}>
          <header className={styles.entrie__header}>
            <h2 className={styles.entrie__place}>{data.place}</h2>
            <h6 className={styles.entrie__email}>{data.email}</h6>
            <h6 className={styles.entrie__date}>{data.date}</h6>
            <p className={styles.entries__description}>
              {data.description}
            </p>
          </header>
          <footer className={styles.entrie__footer}>
          <button className={styles.entrie__button} onClick={handleEdit}><AiFillEdit style={{color:'blue'}} /></button> 
                  <button className={styles.entrie__button} onClick={() => handleDelete(data.id)}><AiFillDelete style={{color:'red'}}/></button>
          </footer>
        </div>
      </li>
    );
  })}
</ul>
  </div>
    )
}

export default MyEntries;
