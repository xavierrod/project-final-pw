import { useNavigate } from 'react-router-dom';
import useServer from '../hooks/useServer.js';

function Login() {
  const { post } = useServer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = Object.fromEntries(new FormData(e.target));
    const { data } = await post({ url: '/users/login', body: credentials });
    if (data) return navigate('/'); //when you log in, it will send you into the front page
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
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
        <button type='submit'> Log in </button>
      </div>
    </form>
  );
}

export default Login;
