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

import auth from './routes/auth';
import test from './routes/test';
import location from './routes/location';

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

app.use('/auth', auth);
app.use('/location', location);
app.use('/test', test);

app.use(errorMiddleware); // keep this as last middleware, which catches all error

seneca
  .client({ host: 'activity-microservice', pin: 'role:activity' })
  .client({ host: 'auth-microservice', pin: 'role:auth' })
  .client({ host: 'location-microservice', pin: 'role:location' })
  .client({ host: 'storage-microservice', pin: 'role:storage' })
  .client({ host: 'timeline-microservice', pin: 'role:timeline' });

http.createServer(app).listen(3000);