/*
hook called useServer that handles HTTP requests to a server. 
The useServer hook returns an object with four methods: get, post, put, and delete. 
Each method takes an object with a url property, and the post and put methods also take a body property. */

/*imports toast from a library called sonner, 
httpService from a file located in the ../services. It also imports another custom hook called useAuth.*/
import { toast } from 'sonner';
import httpService from '../services/httpService.js';
import useAuth from './useAuth.js';

function useServer() {
  const { token, setUser } = useAuth();
  const handleResponse = ({ data, loading, error }) => {

  /*
  checks if the response data object has a status property set to 'ok' and a data property 
  that contains a token.  
  */
 
    if (data?.status === 'ok' && data?.data?.token) {
      setUser({ token: data?.data?.token }); // the token is updated with the new value.
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

  /*
  The handleResponse returns the object passed to it, with data, loading, and error properties. 
  The post,put,get,delete methods call httpService with their respective HTTP methods and the url and token as parameters. */
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
    delete: ({ url }) => httpService({ method: 'DELETE', url, token }),
  };
}

export default useServer;
