import Rating from '../model-rating';
import Location from '../model-location';
import { checkUser, checkPhoto } from '../utils';
import * as _ from 'lodash';

export default async (msg, reply) => {
  const { userId, locationId, photoId } = msg;
  let query:any = {}, result;
  var count:number = 0;

  try{
    if(!_.isNil(userId) && await checkUser(userId, true)){
      query.userId = userId;
      count++;
    }

    if(!_.isNil(photoId) && await checkPhoto(photoId, true)){
      query.photoId = photoId;
      count++;
    }

    if(!_.isNil(locationId)){
      if( _.isString(locationId) && await Location.retrieveById(locationId)){
        if(count == 0){
          result = await Rating.retrieveAvgRate(locationId);
          reply(null, { rating:result });
          return;         
        }
        query.locationId = locationId;
      }else{
        throw new Error("LocationNotExist");
      }
    }

    result = await Rating.retrieveMany(query, Infinity);
    if(result.length == 0){
      throw new Error("ratingNotExist");
    }
    reply(null, { ratings:result });
  }catch(e){
    reply(e, null);
  }
};