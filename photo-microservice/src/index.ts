import * as mongoose from 'mongoose';

import { seneca } from './utils';

import test from './actions/test';

import photoCreate from './actions/photo-create';
import photoDelete from './actions/photo-delete';
import photoPatch from './actions/photo-patch';
import photoRetrieve from './actions/photo-retrieve';
import photoRetrieveAll from'./actions/photo-retrieveAll'

mongoose.connect('mongodb://mongo:27017/photo');

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

seneca
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3001', pin: 'role:activity' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3002', pin: 'role:auth' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3003', pin: 'role:location' })
  .listen({ port: '3004', pin: 'role:photo' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3005', pin: 'role:timeline' })
  .ready(() => {
    seneca
      .add('cmd:test', test)
      .add('cmd:photoCreate', photoCreate)
      .add('cmd:photoDelete', photoDelete)
      .add('cmd:photoPatch', photoPatch)
      .add('cmd:photoRetrieve', photoRetrieve)
      .add('cmd:photoRetrieveAll', photoRetrieveAll)
  });