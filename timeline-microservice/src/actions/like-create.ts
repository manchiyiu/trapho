import Like from '../model';
import { isValidUser, isValidPhoto } from '../utils';

export default async (msg, reply) => {
  const {userId , photoId} = msg;

  try{
    // TODO: check valid
    await isValidUser(userId);
    await isValidPhoto(photoId);
  } catch(e) {
    reply(e, null);
    return ;
  }

  try{
    await Like.retrieveUniquelyByQuery({userId, photoId});
    reply(new Error('likeExist'),null);
    return ;
  } catch(e) {}

  const like = new Like({userId, photoId});
  try{
    let res = await like.save();
    reply(null, {id: res} );
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};