import React from 'react';
import { useNavigate } from 'react-router-dom';
import useServer from '../hooks/useServer.js';

//CCS
import styles from './login.module.css';

function Login() {
  const { post } = useServer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = Object.fromEntries(new FormData(e.target));
    const { data } = await post({ url: '/users/login', body: credentials });
    
   


    if (data) return navigate('/upload'); //when you log in, it will send you into the /PAGE
  };
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div>
        <div>LOGIN</div>
        <div>
          <label htmlFor='email'>Email
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            placeholder='john@doe.com'
          /></label>
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
      </div>
    </form>
  );
}

export default Login;
