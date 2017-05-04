import Like from '../model-like';
import { isValidUser, isValidPhoto } from '../utils';

// action to create like
export default async (msg, reply) => {
  const {userId , photoId} = msg;

  // check if input really valid

  try {
    await isValidUser(userId); // user really exist
    await isValidPhoto(photoId); // photo really exist
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
    return ;
  }

  try {
    await Like.retrieveUniquelyByQuery({userId, photoId}); // retrieve a like by userId + photoId
    reply(new Error('likeExist'),null);
    return ;
  } catch(e) {}

  const like = new Like({userId, photoId});
  try {
    let res = await like.save(); // save the like
    reply(null, {id: res} ); // return the id of the like created
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};