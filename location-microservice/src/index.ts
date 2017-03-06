import * as mongoose from 'mongoose';

import { seneca } from './utils';


import locationCreate from './actions/location-create';
import locationDelete from './actions/location-delete';
import locationPatch from './actions/location-patch';
import locationRetrieve from './actions/location-retrieve';

import ratingCreate from './actions/rating-create';
import ratingDelete from './actions/rating-delete';
import ratingPatch from './actions/rating-patch';
import ratingRetrieve from './actions/rating-retrieve';

mongoose.connect('mongodb://mongo/location');

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

seneca
  .add('cmd:locationCreate', locationCreate)
  .add('cmd:locationDelete', locationDelete)
  .add('cmd:locationPatch', locationDelete)
  .add('cmd:locationRetrieve', locationDelete)
  .add('cmd:ratingCreate', ratingCreate)
  .add('cmd:ratingDelete', ratingDelete)
  .add('cmd:ratingPatch', ratingPatch)
  .add('cmd:ratingRetrieve', ratingRetrieve)
  .listen();
