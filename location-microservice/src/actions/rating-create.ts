import Rating from '../model-rating';
import Location from '../model-location';
import { checkUser, checkPhoto } from '../utils';
import * as _ from 'lodash';

// action to create new rating
export default async (msg, reply) => {

  const { userId, locationId, photoId, rating } = msg;
  let ratingObj, ratedRecord;

  try {
    // check if input are valid
    await checkUser(userId, false);

    if (_.isString(locationId)) {
      await Location.retrieveById(locationId); // check if the location really exist by trying to retrieve it
    } else {
      throw("locationNotExist");
    }

    await checkPhoto(photoId, false);
    if (!_.isNumber(rating) || rating > 10 || rating < 0) {
      throw("invalidRatingError");
    }

    ratingObj = new Rating({
      userId,
      locationId,
      rating,
      photoId
    });

    let result = await ratingObj.save(); // save to database
    reply(null, { id: String(result) }); // reply to Sender: id of the rating created

  } catch(e) {
    reply(e, null);  // propagate the error to send if any
  }

};