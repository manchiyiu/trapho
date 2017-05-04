import Photo from '../model';
import * as _ from 'lodash';
import { isValidUser, isValidLocation } from '../utils';

// action to retrieve photo by photoId, locationId or userId
// will retrieve by EITHER userId or photoId
export default async (msg, reply) => {
  const { userId, photoId, locationId } = msg;

  // retrieve by photoId
  if (!_.isUndefined(photoId)) {
    try {
      let res = await Photo.retrieveById(photoId);
      reply(null, {photos: res});
    } catch(e) {
      reply(new Error('photoNotExist'), null);
    }
    return;
  }

  // retrieve all photos corr. to userId
  if (!_.isUndefined(userId)) {
    try {
      await isValidUser(userId);
      let res = await Photo.retrieveByUserId(userId);
      reply(null, {photos: res});
    } catch(e) {
      reply(new Error('userNotExist'), null);
    }
    return;
  }

  // retrieve all photos corr. to locationId
  if (!_.isUndefined(locationId)) {
    try {
      await isValidLocation(locationId);
      let res = await Photo.retrieveByLocationId(locationId);
      reply(null, { photos: res });
    } catch (e) {
      reply(new Error('userNotExist'), null);
    }
    return;
  }

  reply(new Error('badRequest'), null);
};