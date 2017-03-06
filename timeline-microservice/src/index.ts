import * as mongoose from 'mongoose';

import { seneca } from './utils';

import commentCreate from './actions/comment-create';
import commentDelete from './actions/comment-delete';
import commentPatch from './actions/comment-patch';
import commentRetrieve from './actions/comment-retrieve';

import likeCreate from './actions/like-create';
import likeDelete from './actions/like-delete';
import likeRetrieve from './actions/like-retrieve';

mongoose.connect('mongodb://172.18.0.1:27017/timeline');

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

seneca
  .add('cmd:commentCreate', commentCreate)
  .add('cmd:commentDelete', commentDelete)
  .add('cmd:commentPatch', commentPatch)
  .add('cmd:commentRetrieve', commentRetrieve)
  .add('cmd:likeCreate', likeCreate)
  .add('cmd:likeDelete', likeDelete)
  .add('cmd:likeRetrieve', likeRetrieve)
  .listen({ port: '3005' });