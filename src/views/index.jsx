import React from 'react';
import { useEffect, useState } from 'react';

import useAuth from '../hooks/useAuth';
import useServer from '../hooks/useServer';
import { apiURL } from '../config';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import styles from './index.module.css';

function Home() {
  const { get } = useServer();
  const { isAuthenticated } = useAuth();
  const [entries, setEntries] = useState([]);

  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('date');
  const [direction, setDirection] = useState('ASC');
  const [votes, setVotes] = useState(0);

  const getEntries = async () => {
    const urlParams = [
      search !== '' ? `search=${search}` : '',
      `order=${order}`,
      `direction=${direction}`,
    ];
    const url =
      search !== '' ? `/entries${'?' + urlParams.join('&')}` : `/entries`;
    const { data } = await get({ url });
    setEntries(data.data);
  };

  const searchHandleSubmit = (e) => {
    e.preventDefault();
    getEntries();
  };

  useEffect(() => {
    getEntries();
  }, []);

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  const voteClickHandler = (e) => {
    e.preventDefault();
    voteClickHandler(votes);
  };

  return (
    <div className={styles.container}>
      <h1>Publicaciones Recientes</h1>
      <form action='#' onSubmit={searchHandleSubmit} className={styles.form}>
        <input
          type='text'
          name='search'
          onChange={(e) => setSearch(e.target.value)}
          className={styles.form__input}
          placeholder='¿Qué quieres buscar?'
        />
        <select
          name='order'
          onChange={(e) => setOrder(e.target.value)}
          className={styles.order}
        >
          <option value='date'>Fecha</option>
          <option value='place'>Lugar</option>
          <option value='votes'>Votos</option>
        </select>

        <select
          name='direction'
          onChange={(e) => setDirection(e.target.value)}
          className={styles.order}
        >
          <option value='ASC'>Ascendente</option>
          <option value='DESC'>Descendente</option>
        </select>
        <button type='submit' className={styles.form__submit}>
          Buscar
        </button>
        <a href='/upload' className={styles.entrie__button}>
          Add Post
        </a>
      </form>

      <ul className={styles.entries}>
        {entries.map((data) => {
          const photos = data.photo;
          const photosLength = photos.length;
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
                  <a
                    href='/#'
                    className={styles.entrie__votes}
                    onClick={voteClickHandler}
                  >
                    <h6>Evaluation</h6>
                    {Array(5)
                      .fill()
                      .map((_, i) =>
                        data.votes >= i + 1 ? (
                          <AiFillStar
                            style={{ color: 'orange' }}
                            onClick={() => setVotes(i + 1)}
                          />
                        ) : (
                          <AiOutlineStar
                            style={{ color: 'orange' }}
                            onClick={() => setVotes(i + 1)}
                          />
                        )
                      )}
                  </a>
                </footer>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;

