import Rating from '../model-rating';
import Location from '../model-location';
import { checkUser, checkPhoto } from '../utils';
import * as _ from 'lodash';

export default async (msg, reply) => {
  const { userId, locationId, photoId, rating } = msg;
  let ratingObj, ratedRecord;
  try {
    await checkUser(userId, false);
    if(_.isString(locationId)){
      await Location.retrieveById(locationId);
    }else{
      throw("locationNotExist");
    }
    await checkPhoto(photoId, false);
    if (!_.isNumber(rating) || rating > 10 || rating < 0){
      throw("invalidRatingError");
    }
    ratingObj = new Rating({
      userId,
      locationId,
      rating,
      photoId
    });
    let result = await ratingObj.save();
    reply(null, { id: String(result) });
  }catch(e){
    reply(e, null);
  }
};