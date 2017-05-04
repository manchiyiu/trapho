import Trip from '../model';

// an action to delete trip
export default async (msg, reply) => {
  const { tripId } = msg;
  try {
    let result = await Trip.removeById(tripId); // remove the trip by id
    reply(null, { id : tripId }); // reply to sender: the id of the deleted trip
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
  }
};