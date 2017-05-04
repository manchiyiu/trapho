import Rating from '../model-rating';
import Location from '../model-location';
import { checkUser, checkPhoto } from '../utils';
import * as _ from 'lodash';

// action to delete an existing rating
export default async (msg, reply) => {
  const { userId, locationId, photoId } = msg;

  try {

    // check if input are all valid
    await checkUser(userId, false);
    await checkPhoto(photoId, false);
    if ( _.isString(locationId) ) {
      await Location.retrieveById(locationId); // see if location really exist by trying to retrieve the location by locationId
    } else {
      throw new Error("locationNotExist");
    }

    let result = Rating.removeOne( { userId, locationId, photoId }); // remove a rating by userId + locationId + photoId
    reply(null, { id: result }); // reply to Sender: id of the rating deleted
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
  }

};