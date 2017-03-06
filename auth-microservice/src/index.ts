import * as mongoose from 'mongoose';
import * as Seneca from 'seneca';

import { seneca } from './utils';

import userLogin from './actions/user-login';
import userCreate from './actions/user-create';

mongoose.connect('mongodb://172.18.0.1:27017/user');

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

seneca
  .use('mesh', {
    bases: ['172.18.0.1'],
    tag: 'auth'
  })
  .ready(() => {
    seneca
      .add('cmd:userLogin', userLogin)
      .add('cmd:userCreate', userCreate);
  });
