import * as mongoose from 'mongoose';

import { seneca } from './utils';

import userLogin from './actions/user-login';
import userCreate from './actions/user-create';

mongoose.connect('mongodb://mongo/user');

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

seneca
  .add('cmd:userLogin', userLogin)
  .add('cmd:userCreate', userCreate)
  .listen();
