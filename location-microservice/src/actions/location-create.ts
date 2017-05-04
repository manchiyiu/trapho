import Location from '../model-location';
import { checkName, checkDescription, checkTags, checkCoordinates } from '../utils';

// action to create a new location
export default async(msg, reply) => {

  const {name, description, tags, coordinates} = msg;
  let location;

  try {
    // check if input are valid
    if (
      checkName(name, false) &&
      checkDescription(description, false) &&
      checkTags(tags, false) &&
      checkCoordinates(coordinates, false)
    ) {
      // create a new Location object
      location = new Location({
        name,
        description,
        tags,
        coordinates
      });
    }
  } catch (e) {
    reply(e, null);  // propagate the error to send if any
    return;
  }

  // save the object
  let result = await location.save();
  reply(null, { id: String(result) }); // return the id of the location created

};
