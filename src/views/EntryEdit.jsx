import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useServer from '../hooks/useServer';

function EntryEdit() {
  const { id } = useParams();
  const { get } = useServer();
  const [entry, setEntry] = useState({});

  const getEntry = async () => {
    const { data } = await get({ url: `/entries/${id}` });
    console.log(data.data);
    setEntry(data.data);
  };

  useEffect(() => {
    getEntry();
  }, []);

  return (
    <form>
      <div>
        <label htmlFor='place'>Lugar</label>
        <input type='text' name='place' id='place' value={entry.place} />
      </div>

      <div>
        <label htmlFor='description'></label>
        <input
          type='text'
          name='description'
          id='description'
          value={entry.description}
        />
      </div>
      <button type='submit'>Guardar</button>
    </form>
  );
}

export default EntryEdit;
