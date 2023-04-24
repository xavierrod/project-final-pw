import React from 'react';
import { useNavigate } from 'react-router-dom';
import useServer from '../hooks/useServer.js';

//CSS
import styles from './signup.module.css';

function SignUp() {
  const { post } = useServer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = Object.fromEntries(new FormData(e.target));
    const { data } = await post({ url: '/users', body: credentials });
    console.log(data);
    if (data) return navigate('/login'); //when you log in, it will send you into the /PAGE
  };
  return (
    <form className={styles.signupForm} onSubmit={handleSubmit}>
      <div>
        <div>YOU ARE CREATING AN ACCOUNT</div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            placeholder='john@doe.com'
          />
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
      </div>

      <div>
        <button type='submit'> Sign Up </button>
      </div>
    </form>
  );
}

export default SignUp;
