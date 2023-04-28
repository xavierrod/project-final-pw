import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import useServer from '../hooks/useServer.js';

//CSS
import styles from './login.module.css';

function Login() {
  const { post } = useServer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = Object.fromEntries(new FormData(e.target));
    const { data } = await post({ url: '/users/login', body: credentials });

    //const { data } = await post({ url: '/users/login', body: image, isImage: true });

    if (data) return navigate('/'); //when you log in, it will send you into the /PAGE
  };
  return (
    <div >
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div>
        <div>LOGIN</div>
        <div>
          <label htmlFor='email'>
            Email
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              placeholder='john@doe.com'
            />
          </label>
        </div>

        <div>
          <label htmlFor='pwd'>Password</label>
          <input
            id='pwd'
            name='pwd'
            type='password'
            autoComplete='password'
            required
            placeholder='123123'
          />
        </div>

        <div>
          <button type='submit'> Log in </button>
        </div>
        
        <nav className={styles.nav}>
          <NavLink to='/signup'>signup</NavLink>
        </nav>

      </div>
    </form>
    </div>
  );
}

export default Login;
