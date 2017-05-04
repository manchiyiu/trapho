import Comment from '../model-comment';
import * as _ from 'lodash';
import { isValidUser, isValidPhoto } from '../utils';

// action to retrieve comments by userId, photoId or commentId
export default async (msg, reply) => {
  const { userId, photoId, commentId } = msg;

  // check for all input, if valid, search according to that input and then exit.

  if (!_.isUndefined(commentId)) {
    try {
      let res = await Comment.retrieveById(commentId); // retrieve lists of comment by commentId
      reply(null, res); // reply to Sender: list of comments
    } catch(e) {
      reply(e, null);  // propagate the error to send if any
    }
    return ;
  }

  if (!_.isUndefined(userId)) {
    try {
      await isValidUser(userId); // check if user really exist
      let res = await Comment.retrieveByUserId(userId); // retrieve lists of comment by userId
      reply(null, { comments: res }); // reply to Sender: list of comments
    } catch(e) {
      reply(e, null);  // propagate the error to send if any
    }
    return;
  }

  if (!_.isUndefined(photoId)) {
    try {
      await isValidPhoto(photoId); // check if photo really exist
      let res = await Comment.retrieveByPhotoId(photoId); // retrieve lists of photos by photoId
      reply(null, { comments: res }); // reply to Sender: list of comments
    } catch(e) {
      reply(e, null);  // propagate the error to send if any
    }
    return;
  }

  reply(new Error('badRequest'), null);
};