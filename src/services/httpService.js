import { apiURL } from '../config.js';

async function httpService({
  url,
  method = 'GET',
  token = null,
  body = null,
  hasImage = false,
}) {
  if (!url.startsWith('/')) throw new Error('URL Must Start With a Slash (/)');

  const fullURL = new URL(apiURL + url);
  const config = {
    method,
    headers: {
      Accept: 'application/json',
    },
  };

  if (!hasImage) {
    config.headers['Content-Type'] = 'application/json';
  }

  if (token) {
    config.headers.Authorization = token; // token bearer
  }

  if (body && !hasImage) {
    config.body = JSON.stringify(body);
  }

  if (body && hasImage) {
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
