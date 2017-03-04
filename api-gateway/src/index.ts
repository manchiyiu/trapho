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
  .client({ host: 'activity-microservice', pin: 'role:activity' })
  .client({ host: 'auth-microservice', pin: 'role:auth' })
  .client({ host: 'location-microservice', pin: 'role:location' })
  .client({ host: 'storage-microservice', pin: 'role:storage' })
  .client({ host: 'timeline-microservice', pin: 'role:timeline' });

http.createServer(app).listen(3000);