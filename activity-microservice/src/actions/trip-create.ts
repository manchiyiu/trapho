import Trip from '../model';
import { checkName, checkUser, checkTimestamp, checkLocations, checkDate } from '../utils';

// an action to create new trip
export default async (msg, reply) => {
  const { name, userId, timestamp, locations, startDate, endDate } = msg;

  // check if the input params is valid or not
  try {
    checkName(name, false);
    await checkUser(userId, false);
    // checkTimestamp(timestamp, false);
    checkDate(startDate, false);
    checkDate(endDate, false);
    // await checkLocations(locations, false);
    let trip = new Trip({ name, userId, timestamp, locations, startDate, endDate }); // create a new trip, pending to be saved
    let result = await trip.save(); // save the trip object to database
    reply(null, { id : String(result) }); // reply to sender, the id of the trip created
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
  }
};