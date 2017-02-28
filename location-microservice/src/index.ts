import * as mongoose from 'mongoose';

import { seneca } from './utils';

//functions
import add from './actions/add';
import modify from './actions/modify';
import search from './actions/search';
//import rate from './actions/rate';

mongoose.connect('mongodb://mongo/location');

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

seneca
  .add('cmd:add', add)
  .add('cmd:modify', modify)
  .add('cmd:search', search)
//  .add('cmd:rate', rate)
  .listen();
