import * as mongoose from 'mongoose'

import { seneca } from './utils';

import test from './actions/test';
import tripCreate from './actions/trip-create';
import tripDelete from './actions/trip-delete';
import tripPatch from './actions/trip-patch';
import tripRetrieve from './actions/trip-retrieve';

// connect to mongodb
mongoose.connect('mongodb://mongo:27017/activity');

// error handler
mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
})

// listen to all the microservice call, also ready to be called
seneca
  .listen({ port: '3001', pin: 'role:activity' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3002', pin: 'role:auth' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3003', pin: 'role:location' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3004', pin: 'role:photo' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3005', pin: 'role:timeline' })
  .ready(() => {
    seneca // register to seneca the actions that this microservice can handle
      .add('cmd:test', test)
      .add('cmd:tripCreate', tripCreate)
      .add('cmd:tripDelete', tripDelete)
      .add('cmd:tripPatch', tripPatch)
      .add('cmd:tripRetrieve', tripRetrieve);
  });
