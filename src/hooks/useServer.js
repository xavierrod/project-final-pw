import { toast } from 'sonner';
import httpService from '../services/httpServices';
import useAuth from './useAuth.js';

function useServer() {
  const { token, setUser } = useAuth();

  const handleResponse = ({ data, loading, error }) => {
    if (data?.user && data?.accessToken) {
      setUser({ ...data });
    }

    if (error && error.status === 401) {
      toast.error('user or password incorrect');
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
