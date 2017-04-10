import * as _ from 'lodash';

import Photo from '../model';
import { isValidUser, isValidLocation, isValidURL, isValidDescription } from '../utils';

export default async (msg, reply) => {
  const { photoId, userId, locationId, timestamp, url, description, photoTags } = msg;

  // validate photoId first
  let res;
  try {
    res = await Photo.retrieveById(photoId);
  } catch(e) {
    reply(new Error('photoNotExist'), null);
    return;
  }

  if (_.isString(userId)) {
    try {
      await isValidUser(userId);
      res.userId = userId;
    } catch (e) {
      reply(new Error('userNotExist'), null);
      return;
    }
  }

  if (_.isString(locationId)) {
    try {
      await isValidLocation(locationId);
      res.locationId = locationId;
    } catch (e) {
      reply(new Error('locationNotExist'), null);
      return;
    }
  }

  if (_.isString(url)) {
    try {
      isValidURL(url);
      res.url = url;
    } catch (e) {
      reply(new Error('urlInvalid'), null);
      return;
    }
  }

  if (_.isString(description)) {
    try {
      isValidDescription(description);
      res.description = description;
    } catch (e) {
      reply(new Error('descriptionInvalid'), null);
      return;
    }
  }

  if(!_.isUndefined(photoTags)){
    if(!_.isArray(photoTags)){
      reply(new Error('invalidPhotoTags'), null);
      return;
    }
    res.photoTags = photoTags;
  }

  try {
    await res.patch();
    reply(null, { id: res.id });
  } catch(e) {
    reply(new Error('databaseError'), null);
  }

};