import Trip from '../model';
import { checkName, checkUser, checkTimestamp, checkLocations, checkDate } from '../utils'

// an action to modify an existing trip
export default async (msg, reply) => {
  const { tripId, name, userId, timestamp, locations, startDate, endDate } = msg;
  try {
    // try to retrieve trip info by trip id
    let trip = await Trip.retrieveById(tripId);

    // check if the input are all valid
    if (checkName(name, true)) {
      trip.name = name;
    }
    if (await checkUser(userId, true)) {
      trip.userId = userId;
    }
    if (checkTimestamp(timestamp, true)) {
      trip.timestamp = timestamp;
    }
    if (checkDate(startDate, true)) {
      this.startDate = startDate;
    }
    if (checkDate(endDate, true)) {
      this.endDate = endDate;
    }
    if (await checkLocations(locations, true)) {
      trip.locations = locations;
    }

    await trip.update(); // ask database to update the trip object
    reply(null, { id : tripId }); // reply to sender: the id of the trip modified
  } catch(e) {
    reply(e, null); // propagate the error to send if any
  }
};