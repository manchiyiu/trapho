import * as _ from 'lodash';
import Trip from '../model';
import {checkUser} from '../utils'

export default async(msg, reply) => {
  const {tripId, userId} = msg;
  try {
    // if tripId is a string, try to retrieve from database the trip by id
    if (_.isString(tripId)) {
      let trip = await Trip.retrieveById(tripId);
      reply(null, {trip}); // reply to sender: trip object retrieved
      return;
    }

    // if userId is a valid user, retrieve from database the trip by userId
    if (checkUser(userId, true)) {
      let trips = await Trip.retrieveMany({ userId }, Infinity);
      reply(null, {trips}); // reply to sender: list of trip objects retrieved
      return;
    }

    throw new Error("invalidIdError"); // throw error if id is invalid

  } catch (e) {
    reply(e, null);  // propagate the error to send if any
  }
};