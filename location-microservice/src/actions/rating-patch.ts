import Rating from '../model-rating';
import Location from '../model-location';
import * as _ from 'lodash';
import { checkUser, checkPhoto } from '../utils';

export default async (msg, reply) => {
  const { userId, photoId, locationId, rating } = msg;
  try{
    await checkUser(userId, false);
    await checkPhoto(photoId, false);
    if(_.isString(locationId)){
      await Location.retrieveById(locationId);
    }else{
      throw new Error("locationNotExist");
    }
    if(!_.isNumber( rating ) || rating < 0 || rating > 10){
      throw new Error("invalidRatingError");
    }
    let ratingList = (await Rating.retrieveMany({ userId, photoId, locationId }, 1));
    if(ratingList.length < 1){
      throw new Error("ratingNotExist");
    }
    let ratingObj = ratingList[0];
    ratingObj.rating = rating;
    ratingObj.update();
    reply(null, {id: ratingObj.id});
  }catch(e){
    reply(e, null);
  }


  
  reply(null, null);
};