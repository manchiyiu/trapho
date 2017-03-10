import Location from '../model';
import { checkName, checkDescription, checkTags, checkCoordinates } from '../utils';

export default async(msg, reply) => {

  const {name, description, tags, coordinates} = msg;
  let location;

  try {
    if (
      checkName(name, false) &&
      checkDescription(description, false) &&
      checkTags(tags, false) &&
      checkCoordinates(coordinates, false)
    ) {
      location = new Location({
        name,
        description,
        tags,
        coordinates: [coordinates.lng, coordinates.lat]
      });
    }
  } catch (e) {
    reply(new Error('databaseError'), null);
    return;
  }

  let result = await location.save();
  reply(null, { id: String(result) });

};
