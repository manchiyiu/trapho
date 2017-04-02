import * as mongoose from 'mongoose';

import { seneca } from './utils';

import test from './actions/test';

import photoCreate from './actions/photo-create';
import photoDelete from './actions/photo-delete';
import photoPatch from './actions/photo-patch';
import photoRetrieveLocationIds from './actions/photo-retrieve-locationIds';
import photoLocationStat from './actions/photo-location-stat';
import photoRetrieve from './actions/photo-retrieve';
import photoRetrieveAll from'./actions/photo-retrieveAll';
import photoStreamRetrieve from'./actions/photo-stream-retrieve';
import photoCreateTest from './actions/photo-create-test';

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
      .add('cmd:photoCreateTest', photoCreateTest)
      .add('cmd:photoDelete', photoDelete)
      .add('cmd:photoLocationStat', photoLocationStat)
      .add('cmd:photoPatch', photoPatch)
      .add('cmd:photoRetrieveLocationIds', photoRetrieveLocationIds)
      .add('cmd:photoRetrieve', photoRetrieve)
      .add('cmd:photoRetrieveAll', photoRetrieveAll)
      .add('cmd:photoStreamRetrieve', photoStreamRetrieve)
  });