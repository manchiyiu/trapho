import Rating from '../model-rating';
import Location from '../model-location';
import * as _ from 'lodash';
import { checkUser, checkPhoto } from '../utils';

// action to modify an existing rating
export default async (msg, reply) => {
  const { userId, photoId, locationId, rating } = msg;

  try {

    // check if inputs are all valid
    await checkUser(userId, false);
    await checkPhoto(photoId, false);
    if (_.isString(locationId)) {
      await Location.retrieveById(locationId);
    } else {
      throw new Error("locationNotExist");
    }
    if (!_.isNumber( rating ) || rating < 0 || rating > 10) {
      throw new Error("invalidRatingError");
    }
    let ratingList = (await Rating.retrieveMany({ userId, photoId, locationId }, 1));
    if (ratingList.length < 1) {
      throw new Error("ratingNotExist");
    }

    let ratingObj = ratingList[0]; // only pick the latest rating created by the user (there should be the only one anyway)
    ratingObj.rating = rating;
    ratingObj.update(); // update the rating

    reply(null, {id: ratingObj.id}); // reply to Sender: id of the rating object created

  } catch(e) {
    reply(e, null);  // propagate the error to send if any
  }

};