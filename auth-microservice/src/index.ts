import * as mongoose from 'mongoose';
import * as Seneca from 'seneca';

import { seneca } from './utils';

import test from './actions/test';
import userLogin from './actions/user-login';
import userCreate from './actions/user-create';

mongoose.connect('mongodb://mongo:27017/user');

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

seneca
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3001', pin: 'role:activity' })
  .listen({ port: '3002', pin: 'role:auth' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3003', pin: 'role:location' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3004', pin: 'role:photo' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3005', pin: 'role:timeline' })
  .ready(() => {
    seneca
      .add('cmd:test', test)
      .add('cmd:userLogin', userLogin)
      .add('cmd:userCreate', userCreate);
  });
