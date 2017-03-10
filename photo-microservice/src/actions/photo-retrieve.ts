import Photo from '../model';
import * as _ from 'lodash';

// will retrieve by EITHER userId or photoId
export default async (msg, reply) => {
  const { userId, photoId } = msg;

  // retrieve by photoId
  if (!_.isUndefined(photoId)){
    try{
      let res = await Photo.retrieveById(photoId);
      reply(null, res);
    }
    catch(e){
      reply(e, null);
    }
    return;
  }


  // retrieve all photos corr. to userId
  if (!_.isUndefined(userId)){
    // TODO: check userId if valid

    try{
      let res = await Photo.retrieveByUserId(userId);
      reply(null, {photos: res});
    } catch(e){
      reply(e, null);
    }
    return;
  }

  reply(new Error('invalidArguments'), null);
};