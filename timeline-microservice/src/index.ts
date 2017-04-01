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

import wishlistCreate from './actions/wishlist';

mongoose.connect('mongodb://mongo:27017/timeline');

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

seneca
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3001', pin: 'role:activity' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3002', pin: 'role:auth' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3003', pin: 'role:location' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3004', pin: 'role:photo' })
  .listen({ port: '3005', pin: 'role:timeline' })
  .ready(() => {
    seneca
      .add('cmd:test', test)
      .add('cmd:commentCreate', commentCreate)
      .add('cmd:commentDelete', commentDelete)
      .add('cmd:commentPatch', commentPatch)
      .add('cmd:commentRetrieve', commentRetrieve)
      .add('cmd:likeCreate', likeCreate)
      .add('cmd:likeDelete', likeDelete)
      .add('cmd:likeRetrieve', likeRetrieve)
      .add('cmd:wishlistCreate', wishlistCreate)
  });