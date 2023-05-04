import { useState, useEffect } from 'react';
import useServer from '../hooks/useServer';
import useAuth from '../hooks/useAuth';

import { apiURL } from '../config';
import styles from './myEntries.module.css';

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
    <div className={styles.entry__list}>
      <h1>My Entries</h1>
      <ul>
        {entries.map((data) => {
          return (
            <li key={data.id} className={styles.entry}>
              <div className={styles.entry__header}>
                <h2 className={styles.entry__place}>{data.place}</h2>
                <p className={styles.entry__description}>{data.description}</p>
              </div>
              <div className={styles.entry__photos}>
                {data.photo &&
                  data.photo.map((photo) => {
                    return (
                      <img
                        src={`${apiURL}/${photo.photo}`}
                        key={photo.photo}
                        className={styles.entry__photo}
                      />
                    );
                  })}
              </div>
              <button onClick={() => handleDelete(data.id)}>Delete</button>
              <button onClick={handleEdit}>Edit</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MyEntries;
