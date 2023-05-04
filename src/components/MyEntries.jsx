import { useEffect, useState } from 'react';
import useServer from '../hooks/useServer';
import { apiURL } from '../config';

//CSS
import styles from './MyEntries.module.css';

function MyEntries() {
  const { get } = useServer();
  const [entries, setEntries] = useState([]);
  const { user } = useAuth();

  const getMyEntries = async () => {
    const { data } = await get({ url: '/entries' });
    const myEntries = data.data.filter((entry) => entry.user_id === user.id);
    setEntries(myEntries);
  };

  useEffect(() => {
    getMyEntries();
  }, []);

  return (
    <>
      <div className={styles.entry__list}>
        <h1>My Entries</h1>
        <ul>
          {entries.map((data) => {
            return (
              <li key={data.id} className={styles.entry}>
                <div className={styles.entry__header}>
                  <h2 className={styles.entry__place}>{data.place}</h2>
                  <p className={styles.entry__description}>
                    {data.description}
                  </p>
                </div>
                <div className={styles.entry__photos}>
                  {data.photo &&
                    data.photo.map((photo) => {
                      return (
                        <img
                          className={styles.entry__photo}
                          key={photo.photo}
                          src={`${apiURL}/${photo.photo}`}
                          alt={photo.altText}
                        />
                      );
                    })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MyEntries;
