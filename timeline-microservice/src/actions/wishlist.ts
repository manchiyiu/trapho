import Like from '../model';
import { act, isValidUser, isValidPhoto } from '../utils';

export default async (msg, reply) => {
  const { userId } = msg;
  try{
    let { likes } = await act({role: 'timeline', cmd: 'likeRetrieve', userId});
    likes = await likes.map(async item => {
      const { id , userId, photoId } = item;
      let { locationId } =  await act({ role: 'photo', cmd: 'photoRetrieve', photoId });
      let wish = { 'likeId':id, photoId, locationId };
      return wish;
    });
    reply(null, { 'wishlist': likes } );
  } catch(err){
    reply(err, null);
  }
}