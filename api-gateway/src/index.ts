import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

import { seneca, act } from './utils';

/* import routes */

import test from './routes/test';
import auth from './routes/auth';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/test', test);
app.use('/auth', auth);

seneca
  .client({ host: 'activity-microservice', pin: 'role:activity' })
  .client({ host: 'auth-microservice', pin: 'role:auth' })
  .client({ host: 'location-microservice', pin: 'role:location' })
  .client({ host: 'storage-microservice', pin: 'role:storage' })
  .client({ host: 'timeline-microservice', pin: 'role:timeline' });

app.listen(3000, () => {
  console.log('App listening on port 3000.');
});