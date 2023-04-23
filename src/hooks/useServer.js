import { toast } from 'sonner';
import httpService from '../services/httpService.js';
import useAuth from './useAuth.js';

function useServer() {
  const { token, setUser } = useAuth();
  //backend values: status, message, data, token
  const handleResponse = ({ data, loading, error }) => {
    if (data?.status === 'ok') {
      setUser({ ...data });
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
