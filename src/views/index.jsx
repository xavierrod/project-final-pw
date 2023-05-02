import { useEffect, useState } from 'react';
//import useAuth from '../hooks/useAuth';
import useServer from '../hooks/useServer';
import styles from './index.module.css';

import { apiURL } from '../config';

function Index() {
  const { get } = useServer();
  //const { isAuthenticated,user } = useAuth();
  const [entries, setEntries] = useState([]);

  const getEntries = async () => {
    const { data } = await get({ url: '/entries' });
    setEntries(data.data);
  };

  useEffect(() => {
    getEntries();
  }, []);

  // <img src={`${apiURL}/${data.photo[0].photo}`} alt='' />

  return (
    <>
      <div className={styles.entry__list}>
        <h1>List of Entries</h1>
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

export default Index;

/* 
`https://diario.backends.hackaboss.com/`
 */

/* Base del profesor
function Index() {
  const { isAuthenticated } = useAuth();
  const { get } = useServer();

  const [entries, setEntries] = useState();

  const getEntries = async () => {
    const { data } = await get({ url: '/entries' });
    setEntries(data.data);
  };

  useEffect(() => {
    getEntries();
  }, []);

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  return <></>;
} */
