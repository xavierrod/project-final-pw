import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
    <div className={styles.signupContainer}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div>
          <h2>Login</h2>
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
            <label htmlFor='pwd'>
              Password
              <input
                id='pwd'
                name='pwd'
                type='password'
                autoComplete='password'
                required
                placeholder='123123'
              />
            </label>
          </div>
        </div>

        <div>
          <button type='submit'>  Login  </button>
        </div>
        <p className={styles.loginLink}>
          New User?&nbsp;&nbsp;&nbsp;
          <Link to='/signup'>Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
