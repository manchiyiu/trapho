import * as Vue from 'vue';
import * as queryString from 'query-string';
import * as _ from 'lodash';

const BASE_PATH = 'http://104.199.134.31:3000/';

const helper = async (router, path, method, options, func) => {
  let res = await fetch(BASE_PATH + path, _.merge({ method }, options));
  if (res.status === 403) {
    router.push('/');
  }
  let result = await res.json();
  func && func(result);
  return result;
};

export const get = async (router, path) => await helper(router, path, 'GET', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
  }
});

export const post = async (router, path, payload) => await helper(router, path, 'POST', {
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
