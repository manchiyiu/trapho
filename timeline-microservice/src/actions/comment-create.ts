import Comment from '../model-comment';
import { isValidContent, isValidPhoto, isValidTime, isValidUser } from '../utils';

export default async (msg, reply) => {
  const {userId, photoId, timestamp, content} = msg;

  try{
    isValidUser(userId);
    isValidPhoto(photoId);
    isValidTime(timestamp);
    isValidContent(content);
  } catch(e){
    reply(e, null);
    return;
  }

  const comment: Comment = new Comment({userId, photoId, timestamp, content});
  try{
    let res = await comment.save();
    reply(null, {id: res});
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};