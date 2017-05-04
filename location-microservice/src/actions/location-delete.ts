import Location from '../model-location';

// action to delete an existing location
export default async (msg, reply) => {

  const { locationId } = msg;

  try {
    let result = await Location.removeById(locationId); // delete by id
    reply(null, { id: locationId }); // return the id of the location deleted
  } catch (e) {
    reply(e, null);  // propagate the error to send if any
  }

};