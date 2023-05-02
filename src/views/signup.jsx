import React from 'react';
import { useNavigate } from 'react-router-dom';
import useServer from '../hooks/useServer.js';
import { Link } from 'react-router-dom';

//CSS
import styles from './signup.module.css';

function SignUp() {
  const { post } = useServer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = Object.fromEntries(new FormData(e.target));
    const { data } = await post({ url: '/users', body: credentials });
    /*  console.log(data); */

    if (data) {
      // If registration is successful, try to log the user in with the same credentials
      const { data: loginData } = await post({
        url: '/users/login',
        body: credentials,
      });
      /* console.log(loginData); */

      if (loginData) {
        localStorage.setItem('token', loginData.token);
        navigate('/');
      }
    }
  };
  return (
    <div className={styles.signupContainer}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div>
          <h2>Sign Up</h2>
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
          <button type='submit'> Sign Up </button>
        </div>
        <p className={styles.loginLink}>
          Already have an account?&nbsp;&nbsp;&nbsp;
          <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
