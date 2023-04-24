import { toast } from 'sonner';
import httpService from '../services/httpService.js';
import useAuth from './useAuth.js';

function useServer() {
  const { token, setUser } = useAuth();
  //backend values: status, message, data, token
  const handleResponse = ({ data, loading, error }) => {
    console.log('test',data, loading, error)

    if (data?.status === 'ok' && data?.data?.token) {
      setUser({token: data?.data?.token}); // the token 
    }
    //backend values: de login incorrecto
    if (error && error.status === 'error') {
      toast.error(data?.message);
    } else {
      if (error) {
        toast.error(error.message);
      }
    }

    return { data, loading, error };
  };


  //token is the 
  return {
    get: ({ url }) => httpService({ method: 'GET', url, token }),
    post: ({ url, body }) =>
      httpService({ method: 'POST', url, token, body }).then(handleResponse),
    put: ({ url, body }) =>
      httpService({ method: 'PUT', url, token, body }).then(handleResponse),
    delete: ({ url }) => httpService({ method: 'DELETE', url, token }),
  };
}

export default useServer;
