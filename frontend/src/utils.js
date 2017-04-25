import * as Vue from 'vue';
import * as queryString from 'query-string';
import * as _ from 'lodash';

// the location of the backend server
const BASE_PATH = 'https://isaac-unfold.me:3000/';

// the URL for uploading photo, to be imported by other components
export const UPLOAD_PATH = `${BASE_PATH}photos/upload`;

// convert a image id to its actual URL
export const getPhotoUrl = url => `${BASE_PATH}static/${url}`;

// a helper function to be used by GET, POST, DEL, PATCH function, which uses the fetch API to send
// an HTTP request and serialize the result into a JSON
const helper = async (router, path, method, options, func) => {
  let res = await fetch(BASE_PATH + path, _.merge({ method }, options));
  if (res.status === 403) { // 403 status code means user has not login in
    delete localStorage.token;
    router.push('/'); // redirect the user to login page
  }
  let result = await res.json();
  func && func(result);
  return result;
};

// function for sending GET request
export const get = async (router, path, payload = {}) => await helper(
  router,
  `${path}?${queryString.stringify(payload)}`, // convert the payload to a query string and append to the URL path
  'GET',
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}` // include the user token in header for authenication purpose
    }
  }
);

// function for sending POST request
export const post = async (router, path, payload) => await helper(router, path, 'POST', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}` // include the user token in header for authenication purpose
  },
  body: JSON.stringify(payload) // serialize the JSON payload into a string
});

// function for sending DELETE request (function name is del because DELETE is a reserved word in JavaScript)
export const del = async (router, path, payload) => await helper(router, path, 'DELETE', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}` // include the user token in header for authenication purpose
  },
  body: JSON.stringify(payload) // serialize the JSON payload into a string
});

// function for sending PATCH request
export const patch = async (router, path, payload) => await helper(router, path, 'PATCH', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}` // include the user token in header for authenication purpose
  },
  body: JSON.stringify(payload) // serialize the JSON payload into a string
});

// function for sending LOGIN POST request
export const login = async (router, { username, password }) => await helper(router, 'auth/login', 'POST', {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // the username and password need to be sent in HTML form payload
  },
  body: queryString.stringify({ username, password })
}, (result) => {
  localStorage.token = result.token; // if successful, store the user token in the browser localStorage
});

// function for sending LOGIN POST request, to allow frontend to test whether the logined user can provide a correct username and password
// compared to login(), this will not store the new token in the browser localStorage if successful
export const loginTest = async (router, { username, password }) => await helper(router, 'auth/login', 'POST', {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: queryString.stringify({ username, password })
});
