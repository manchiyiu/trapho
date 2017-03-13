import Photo from '../model'
import { isValidUser, isValidLocation, isValidURL, isValidDescription } from '../utils';

export default async (msg, reply) => {
  const { userId, locationId, url, description } = msg;

  // check if all valid
  try{
    await isValidUser(userId);
    await isValidLocation(locationId);
    isValidURL(url);
    isValidDescription(description);
  } catch(e) {
    reply(e,null);
    return;
  }

  // create new photo object in database
  const photo = new Photo({userId, locationId, url, description});
  try{
    let res = await photo.save();
    reply(null, { id : res });
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};