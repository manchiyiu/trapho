import Like from '../model';
import { act, isValidUser, isValidPhoto } from '../utils';
import likeRetrieve from './like-retrieve';

export default async (msg, reply) => {
  const { userId } = msg;
  try{
    await isValidUser(userId);
    let likes = await Like.retrieveByUserId(userId);
    likes = await Promise.all(likes.map(async item => {
      const { id , userId, photoId } = item;
      let { locationId } =  await act({ role: 'photo', cmd: 'photoRetrieve', photoId });
      let wish = { 'likeId':id, photoId, locationId };
      return wish;
    }));
    reply(null, { 'wishlist': likes } );
  } catch(err){
    reply(err, null);
  }
}