import * as Vue from 'vue';
import * as queryString from 'query-string';
import * as _ from 'lodash';

const BASE_PATH = 'http://104.199.134.31:3000/';

export const UPLOAD_PATH = `${BASE_PATH}photos/upload`;

export const getPhotoUrl = url => `${BASE_PATH}static/${url}`;

const helper = async (router, path, method, options, func) => {
  let res = await fetch(BASE_PATH + path, _.merge({ method }, options));
  if (res.status === 403) {
    delete localStorage.token;
    router.push('/');
  }
  let result = await res.json();
  func && func(result);
  return result;
};

export const get = async (router, path, payload = {}) => await helper(
  router,
  `${path}?${queryString.stringify(payload)}`,
  'GET',
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    }
  }
);

export const post = async (router, path, payload) => await helper(router, path, 'POST', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
  },
  body: JSON.stringify(payload)
});

export const del = async (router, path, payload) => await helper(router, path, 'DELETE', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
  },
  body: JSON.stringify(payload)
});

export const login = async (router, { username, password }) => await helper(router, 'auth/login', 'POST', {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: queryString.stringify({ username, password })
}, (result) => {
  localStorage.token = result.token;
});
