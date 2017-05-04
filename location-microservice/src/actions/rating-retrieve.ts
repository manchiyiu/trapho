import Rating from '../model-rating';
import Location from '../model-location';
import { checkUser, checkPhoto } from '../utils';
import * as _ from 'lodash';

// action to retrieve a rating by userId + locationId + photoId
export default async (msg, reply) => {
  const { userId, locationId, photoId } = msg;
  let query:any = {}, result;
  var count:number = 0; // to remember number of successful validation check

  // check if input all valid
  try {
    if (!_.isNil(userId) && await checkUser(userId, true)) { // check if user really exist by calling auth microservice
      query.userId = userId;
      count++;
    }

    if (!_.isNil(photoId) && await checkPhoto(photoId, true)) { // check if photo really exist by calling photo microservice
      query.photoId = photoId;
      count++;
    }

    // if there is no userId + photoId => we are only interested in rating (this action is probably too overloaded)
    if (!_.isNil(locationId)) {
      if ( _.isString(locationId) && await Location.retrieveById(locationId)) { // check if location really exist by trying to retrieve the location by locationId
        if (count == 0) {
          result = await Rating.retrieveAvgRate(locationId); // calculate the average rating
          reply(null, { avgRating: {locationId : locationId, rating : result }});  // reply to Sender: average rating of the location
          return;
        }
        query.locationId = locationId;
      } else {
        throw new Error("LocationNotExist");
      }
    }

    // if there is query / locationId / userId => retrieve location
    result = await Rating.retrieveMany(query, Infinity);
    if (result.length == 0) {
      throw new Error("ratingNotExist");
    }

    reply(null, { ratings: result }); // reply to Sender: ratings of the location
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
  }
};