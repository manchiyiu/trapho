import * as mongoose from 'mongoose';

import { seneca } from './utils';

import photoCreate from './actions/photo-create';
import photoDelete from './actions/photo-delete';
import photoPatch from './actions/photo-patch';
import photoRetrieve from './actions/photo-retrieve';

mongoose.connect('mongodb://172.18.0.1:27017/photo');

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

seneca
  .add('cmd:photoCreate', photoCreate)
  .add('cmd:photoDelete', photoDelete)
  .add('cmd:photoPatch', photoPatch)
  .add('cmd:photoRetrieve', photoRetrieve)
  .listen({ port: '3004' });