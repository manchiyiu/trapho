import Comment from '../model-comment';
import {isValidContent, isValidPhoto, isValidTime, isValidUser} from '../utils';

// action to modify existing comment
export default async (msg, reply) => {
  const { commentId, content, photoId, timestamp, userId } = msg;

  let res;

  // check if input are all valid

  try {
    res = await Comment.retrieveById(commentId); // check if comment really exist by trying to retrieve the comment by id
  } catch(e) {
    reply(e, null);
    return;
  }

  try {
    await isValidContent(content); // the content is valid
    res.content = content;
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
  }

  try {
    await isValidPhoto(content); // the photo really exist
    res.photoId = photoId;
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
  }

  try {
    await isValidUser(userId); // the user really exist
    res.userId = userId;
  } catch(e) {}

  try {
    await isValidTime(timestamp); // timestamp really is valid
    res.timestamp = timestamp;
  } catch(e) {}

  try {
    res.patch(); // call database to patch the object
    reply(null, { id: commentId }); // reply to Sender: id of thr modified comment
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
  }

};