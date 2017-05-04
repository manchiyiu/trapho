import * as express from 'express';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as https from 'https';
import * as _ from 'lodash';
import * as expressJwt from 'express-jwt';
import * as fileUpload from 'express-fileupload';
import * as fs from 'fs';

import { seneca, act, errorMiddleware, SERVER_SECRET } from './utils';

import './passport';

/* import the SSL keys */

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

/* import routes */

import test from './routes/test';
import auth from './routes/auth';

import locations from './routes/locations';
import ratings from './routes/ratings';
import photos from './routes/photos';
import comments from './routes/comments';
import trips from './routes/trips';
import likes from './routes/likes'

const app = express();

// for parsing payload
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// for cross-site connection
app.use(cors());

// for authenication
app.use(passport.initialize());
app.use(passport.session());

// for uploading file to the user
app.use(fileUpload());

// for generating user token
app.use(
  expressJwt({ secret: SERVER_SECRET }).unless({
    path: [
      '/auth/login',
      '/auth/signup',
      /\/static\/.*/
    ]
  })
);

// initialize all path

app.use('/static', express.static('/data/photos'));

app.use('/test', test);
app.use('/auth', auth);

app.use('/locations', locations);
app.use('/ratings', ratings);
app.use('/photos', photos);
app.use('/comments', comments);
app.use('/trips', trips);
app.use('/likes', likes);

app.use(errorMiddleware); // keep this as last middleware, which catches all error

// register this as a client for all microservice
seneca
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3001', pin: 'role:activity' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3002', pin: 'role:auth' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3003', pin: 'role:location' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3004', pin: 'role:photo' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3005', pin: 'role:timeline' });


// kickstart the server
https
  .createServer({
    key, cert
  }, app)
  .listen(3000);
