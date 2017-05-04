import Like from '../model-like';
import * as _ from 'lodash';
import { isValidPhoto, isValidUser } from '../utils';

// action to retrieve likes by userId + photoId
export default async (msg, reply) => {
  const {userId, photoId} = msg;

  // define choice
  // 0: error, no retrieve
  // 1: retrieve list of likes by userId
  // 2: retrieve list of likes by photoId
  // 3: retrieve ONE like by userId and photoId

  let choice = 0;

  // check if input really valid

  if (!_.isUndefined(userId)) {
    try {
      await isValidUser(userId); // see if user really exist
      choice += 1;
    } catch(e) {
      reply(e, null);  // propagate the error to send if any
    }
  }

  if (!_.isUndefined(photoId)) {
    try {
      await isValidPhoto(photoId); // see if photo really exist
      choice += 2;
    } catch(e) {
      reply(e, null);  // propagate the error to send if any
    }
  }

  let res;
  switch(choice) {
    case 1: {
      try {
        res = await Like.retrieveByUserId(userId); // retrieve list of likes by userId
        reply(null, { likes: res }); // reply to Sender: list of likes
      } catch (e) {
        reply(e, null);  // propagate the error to send if any
      }
      break;
    }

    case 2: {
      try {
        res = await Like.retrieveByPhotoId(photoId); // retrieve list of likes by photoId
        reply(null, { likes: res }); // reply to Sender: list of likes
      } catch (e) {
        reply(e, null);  // propagate the error to send if any
      }
      break;
    }

    case 3: {
      try {
        res = await Like.retrieveUniquelyByQuery({ userId, photoId }); // retrieve like by userId + photoId
        reply(null, { likes: res }); // reply to Sender: list of likes (should have only one element)
      } catch (e) {
        reply(e, null);  // propagate the error to send if any
      }
      break;
    }

    default: reply(null, null);
  }
};