import Photo from '../model';
import { isValidUser, isValidLocation, isValidURL, isValidDescription } from '../utils';
import { act } from '../utils';
import * as _ from 'lodash';


export default async (msg, reply) => {
  const { userId, locationId, url, description , rating, photoTags } = msg;

  // check if all valid
  try{
    await isValidUser(userId);
    await isValidLocation(locationId);
    isValidURL(url);
    isValidDescription(description);
    if(!_.isNumber(rating) || rating < 0 || rating > 10){
      throw new Error("invalidRatingError");
    }
    if(!_.isArray(photoTags)){
      throw new Error("invalidPhotoTags");
    }
  } catch(e) {
    reply(e, null);
    return;
  }

  // create new photo object in database
  const photo = new Photo({userId, locationId, url, description, photoTags});
  try {
    let res = await photo.save();
    await act({ role: 'location', cmd: 'ratingCreate', userId, locationId, 'photoId':res , rating }); 
    reply(null, { id: res });
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};