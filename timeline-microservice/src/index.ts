import * as mongoose from 'mongoose';

import { seneca } from './utils';

import test from './actions/test';

import commentCreate from './actions/comment-create';
import commentDelete from './actions/comment-delete';
import commentPatch from './actions/comment-patch';
import commentRetrieve from './actions/comment-retrieve';

import likeCreate from './actions/like-create';
import likeDelete from './actions/like-delete';
import likeRetrieve from './actions/like-retrieve';

// connect to mongodb
mongoose.connect('mongodb://mongo:27017/timeline');

// error handler
mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

// listen to all the microservice call, also ready to be called
seneca
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3001', pin: 'role:activity' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3002', pin: 'role:auth' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3003', pin: 'role:location' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3004', pin: 'role:photo' })
  .listen({ port: '3005', pin: 'role:timeline' })
  .ready(() => {
    seneca // register to seneca the actions that this microservice can handle
      .add('cmd:test', test)
      .add('cmd:commentCreate', commentCreate)
      .add('cmd:commentDelete', commentDelete)
      .add('cmd:commentPatch', commentPatch)
      .add('cmd:commentRetrieve', commentRetrieve)
      .add('cmd:likeCreate', likeCreate)
      .add('cmd:likeDelete', likeDelete)
      .add('cmd:likeRetrieve', likeRetrieve)
  });