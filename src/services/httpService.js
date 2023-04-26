import { apiURL } from '../config.js';

async function httpService({
  url,
  method = 'GET',
  token = null,
  body = null,
  isImage = false,
}) {
  if (!url.startsWith('/')) throw new Error('URL Must Start With a Slash (/)');

  const fullURL = new URL(apiURL + url); //asincronia
  const config = {
    method,
    headers: {
      Accept: 'application/json',
    },
  };

  if (!isImage) {
    config.headers['Content-Type'] = 'application/json';
  }

  if (token) {
<<<<<<< HEAD:src/services/httpService.js
    config.headers.Authorization = `Bearer ${token}`; // token bearer
=======
    config.headers.Authorization = `Bearer ${token}`; //bearer token
>>>>>>> 83d085d8432276e80e38fdd6353a6ef2a7039534:src/services/httpServices.js
  }

  if (body && !isImage) {
    config.body = JSON.stringify(body);
  }

  if (body && isImage) {
    config.body = body;
  }

  try {
    const response = await fetch(fullURL.href, config);
    const data = await response.json();

    return { data, loading: false, error: data.error || null };
  } catch (error) {
    return { data: null, loading: false, error };
  }
}

export default httpService;
