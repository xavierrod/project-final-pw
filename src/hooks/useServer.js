
import { toast } from 'sonner';
import httpService from '../services/httpService.js';
import useAuth from './useAuth.js';

function useServer() {
  const { token, setUser } = useAuth();
  const handleResponse = ({ data, loading, error }) => {
 

    if (data?.status === 'ok' && data?.data?.token) {
      setUser({ token: data?.data?.token }); 
    }
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
    post: ({ url, body, hasImage }) =>
      httpService({ method: 'POST', url, token, body, hasImage }).then(
        handleResponse
      ),
    put: ({ url, body, hasImage }) =>
      httpService({ method: 'PUT', url, token, body, hasImage }).then(
        handleResponse
      ),
    patch: ({ url, body, hasImage }) =>
      httpService({ method: 'PATCH', url, token, body, hasImage }).then(
        handleResponse
      ),
    delete: ({ url }) => httpService({ method: 'DELETE', url, token }),
  };
}

export default useServer;
