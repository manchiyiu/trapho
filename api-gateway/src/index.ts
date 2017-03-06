import * as express from 'express';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as http from 'http';
import * as _ from 'lodash';
import * as expressJwt from 'express-jwt';

import { seneca, act, errorMiddleware, SERVER_SECRET } from './utils';

import './passport';

/* import routes */

import test from './routes/test';
import auth from './routes/auth';

import locations from './routes/locations';
import ratings from './routes/ratings';
import photos from './routes/photos';
import comments from './routes/comments';
import trips from './routes/trips';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  expressJwt({ secret: SERVER_SECRET }).unless({
    path: [
      '/auth/login',
      '/auth/signup'
    ]
  })
);

app.use('/test', test);
app.use('/auth', auth);

app.use('/locations', locations);
app.use('/ratings', ratings);
app.use('/photos', photos);
app.use('/comments', comments);
app.use('/trips', trips);

app.use(errorMiddleware); // keep this as last middleware, which catches all error

seneca
  .use('mesh', {
    isbase: true
  })
  // .client({ host: '172.18.0.1', port: '3001', pin: 'role:activity' })
  // .client({ host: '172.18.0.1', port: '3002', pin: 'role:auth' })
  // .client({ host: '172.18.0.1', port: '3003', pin: 'role:location' })
  // .client({ host: '172.18.0.1', port: '3004', pin: 'role:photo' })
  // .client({ host: '172.18.0.1', port: '3005', pin: 'role:timeline' });

http.createServer(app).listen(3000);