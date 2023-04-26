import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useServer from '../hooks/useServer';

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
}

export default Index;
