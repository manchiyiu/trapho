import Location from '../model-location';
import { checkName, checkDescription, checkTags, checkCoordinates } from '../utils';

// action to modify an existing location
export default async (msg, reply) => {

  const { locationId, coordinates, name, description, tags } = msg;
  let location;

  // try to retrieve the location to see if it really exist
  try {
    location = await Location.retrieveById(locationId);
  } catch (e) {
    reply(e, null);  // propagate the error to send if any
    return;
  }

  // check if the location payload are really valid
  try {
    if (checkName(name, true)) {
      location.name = name;
    }
    if (checkDescription(description, true)) {
      location.description = description;
    }
    if (checkTags(tags, true)) {
      location.tags = tags;
    }
    if (checkCoordinates(coordinates, true)) {
      location.coordinates = [coordinates.lng, coordinates.lat];
    }
  } catch (e) {
    reply(e, null);  // propagate the error to send if any
    return;
  }

  // attempt to update the location
  try {
    let result = await location.update();
    reply(null, {id: locationId}); // reply to sender: the id of the location modified
  } catch (e) {
    reply(e, null);  // propagate the error to send if any
  }

};