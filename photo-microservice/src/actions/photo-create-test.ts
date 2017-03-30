import Photo from '../model';
import { isValidUser, isValidURL, isValidDescription, retrieveLocationsByQuery } from '../utils';

export default async (msg, reply) => {
  const { userId, locationQuery, url, description } = msg;

  // check if all valid
  try{
    await isValidUser(userId);
    isValidURL(url);
    isValidDescription(description);
  } catch(e) {
    reply(e, null);
    return;
  }

  try {
  let location:any = retrieveLocationsByQuery(locationQuery);

  // create new photo object in database
  const photo = new Photo({userId, location: location.id, url, description});

    let res = await photo.save();
    reply(null, { id: res });
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};