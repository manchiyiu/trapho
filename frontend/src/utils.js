import * as queryString from 'query-string';

const BASE_PATH = 'http://localhost:3000/';

export const post = (path, payload) =>
  fetch(
    BASE_PATH + path,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window._token}`
      },
      body: JSON.stringify(payload)
    }
  ).then(res => res.json());

export const login = ({ username, password }) =>
  fetch(
    BASE_PATH + 'auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: queryString.stringify({ username, password })
    }
  ).then(res => res.json());
