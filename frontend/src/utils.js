const BASE_PATH = 'http://localhost:3000/';

export const post = (path, payload) =>
  fetch(
    BASE_PATH + path,
    {
      method: 'POST',
      body: JSON.stringify(payload)
    }
  ).then(res => res.json());