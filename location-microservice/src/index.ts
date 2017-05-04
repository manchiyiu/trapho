import * as mongoose from 'mongoose';

import { seneca } from './utils';


import test from './actions/test';
import locationCreate from './actions/location-create';
import locationDelete from './actions/location-delete';
import locationPatch from './actions/location-patch';
import locationRetrieve from './actions/location-retrieve';
import locationWishlist from './actions/location-wishlist';

import ratingCreate from './actions/rating-create';
import ratingDelete from './actions/rating-delete';
import ratingPatch from './actions/rating-patch';
import ratingRetrieve from './actions/rating-retrieve';

// connect to the database
mongoose.connect('mongodb://mongo:27017/location');

// error handler
mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

// listen to all the microservice call, also ready to be called
seneca
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3001', pin: 'role:activity' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3002', pin: 'role:auth' })
  .listen({ port: '3003', pin: 'role:location' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3004', pin: 'role:photo' })
  .client({ host: process.env.BRIDGE_ADDRESS, port: '3005', pin: 'role:timeline' })
  .ready(() => {
    seneca // register to seneca the actions that this microservice can handle
      .add('cmd:test', test)
      .add('cmd:locationCreate', locationCreate)
      .add('cmd:locationDelete', locationDelete)
      .add('cmd:locationPatch', locationPatch)
      .add('cmd:locationRetrieve', locationRetrieve)
      .add('cmd:locationWishlist', locationWishlist)
      .add('cmd:ratingCreate', ratingCreate)
      .add('cmd:ratingDelete', ratingDelete)
      .add('cmd:ratingPatch', ratingPatch)
      .add('cmd:ratingRetrieve', ratingRetrieve)
  });