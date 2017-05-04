import Photo from '../model';
import { isValidUser, isValidURL, isValidDescription, retrieveLocationsByQuery } from '../utils';

// action to create photo, for the scapper script usage only
export default async (msg, reply) => {
  const { userId, locationQuery, url, description } = msg;

  // check if all valid
  try {
    await isValidUser(userId);
    isValidURL(url);
    isValidDescription(description);
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
    return;
  }

  try {
    let location:any = await retrieveLocationsByQuery(locationQuery);

    // create new photo object in database
    const photo = new Photo({userId, locationId: location.id, url, description});

    let res = await photo.save();
    reply(null, { id: res });
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};