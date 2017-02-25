import * as mongoose from 'mongoose';

import { seneca } from './utils';

import login from './actions/login';
import signup from './actions/signup';

mongoose.connect('mongodb://mongo/user');

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

seneca
  .add('cmd:login', login)
  .add('cmd:signup', signup)
  .listen();
