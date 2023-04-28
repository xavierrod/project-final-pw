import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useServer from '../hooks/useServer';

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
      <div>
        <h1>List of Entries</h1>
        <ul>
          {entries.map((data) => {
            const photos = data.photo;
            const photosLength = photos.length;
            return (
              <li key={data.id}>
                <h2>{data.place}</h2>
                <p>{data.description}</p>
                <div>
                  {photosLength &&
                    photos.map((photo) => {
                      return (
                        <img
                          style={{
                            maxWidth: '100%',
                          }}
                          key={photo.photo}
                          src={`${apiURL}/${photo.photo}`}
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

/* 
`https://diario.backends.hackaboss.com/`
 */

export default Index;

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
