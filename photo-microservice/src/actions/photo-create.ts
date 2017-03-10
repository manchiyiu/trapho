import Photo from '../model'
import { act } from '../utils';

export default async (msg, reply) => {
  const { userId, locationId, url, description} = msg;

  // TODO: check valid userId

  // check location valid
  // try{
  //   await act({ role:'location', cmd:'locationRetrieve', locationId });
  // } catch(e) {
  //   reply(e, null);
  //   return;
  // }

  console.log('valid loc');
  // create new photo object in database
  const photo = new Photo({userId, locationId, url, description});
  try{
    let res = await photo.save();
    reply(null, { id : res });
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};