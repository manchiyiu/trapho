import Comment from '../model-comment';
import { isValidContent, isValidPhoto, isValidTime, isValidUser } from '../utils';

// action to create new comment
export default async (msg, reply) => {
  const {userId, photoId, timestamp, content} = msg;

  // check if input really valid
  try {
    isValidUser(userId);
    isValidPhoto(photoId);
    isValidTime(timestamp);
    isValidContent(content);
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
    return;
  }

  const comment: Comment = new Comment({userId, photoId, timestamp, content});

  try {
    let res = await comment.save(); // save the object to the database
    reply(null, {id: res}); // reply to Sender: id of the comment created
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};