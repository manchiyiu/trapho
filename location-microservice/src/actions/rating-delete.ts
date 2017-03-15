import Rating from '../model-rating';
import Location from '../model-location';
import { checkUser, checkPhoto } from '../utils';
import * as _ from 'lodash';

export default async (msg, reply) => {
  const { userId, locationId, photoId } = msg;
  try{
    await checkUser(userId, false);
    await checkPhoto(photoId, false);
    if( _.isString(locationId) ){
      await Location.retrieveById(locationId);
    }else{
      throw new Error("locationNotExist");
    }
    let result = Rating.removeOne( { userId, locationId, photoId });
    reply(null, { id: result });
  }catch(e){
    reply(e, null);
  }

};