import Photo from '../model';
import { isValidUser, isValidLocation, isValidURL, isValidDescription } from '../utils';


export default async (msg, reply) => {
  const { photoId, userId, locationId, timestamp, url, description } = msg;

  // validate photoId first
  let res;
  try{
    res = await Photo.retrieveById(photoId);
  } catch(e) {
    // photo not exist
    reply(e, null);
    return;
  }

  try{
    await isValidUser(userId);
    res.userId = userId;
  } catch(e) {
    // ignore error, since option field
  }

  try{
    await isValidLocation(locationId);
    res.locationId = locationId;
  } catch(e) {}


  try{
    isValidURL(url);
    res.url = url;
  } catch(e) {}

  try{
    isValidDescription(description);
    res.description = description;
  } catch(e) {}

  try{
    await res.patch();
    reply(null, {id: res.id});
  } catch(e) {
    reply(e, null);
  }
};