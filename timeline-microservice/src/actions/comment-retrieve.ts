import Comment from '../model-comment';
import * as _ from 'lodash';
import { isValidUser, isValidPhoto } from '../utils';
export default async (msg, reply) => {
  const { userId, photoId, commentId } = msg;

  if (!_.isUndefined(commentId)){
    try{
      let res = await Comment.retrieveById(commentId);
      reply(null, res);
    } catch(e){
      reply(e, null);
    }
    return ;
  }

  if (!_.isUndefined(userId)){
    try{
      await isValidUser(userId);
      let res = await Comment.retrieveByUserId(userId);
      reply(null, { comments: res });
    } catch(e){
      reply(e, null);
    }
    return;
  }

  if (!_.isUndefined(photoId)){
    try{
      await isValidUser(photoId);
      let res = await Comment.retrieveByPhotoId(photoId);
      reply(null, { comments: res });
    } catch(e){
      reply(e, null);
    }
    return;
  }

  reply(new Error('badRequest'), null);
};