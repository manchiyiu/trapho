import Photo from '../model'
import { act, isValidLocation } from '../utils';

export default async (msg, reply) => {
  const { userId, locationId, url, description } = msg;

  // TODO: check valid userId

  // check location valid
  try{
        let res = await act({ role: 'location', cmd: 'locationRetrieve'});
        console.log(res);
    } catch(e) {
        reply(e, null);
        return;
    }

  // if (!isValidLocation(locationId)){
  //   return;
  // }

  // create new photo object in database
  const photo = new Photo({userId, locationId, url, description});
  try{
    let res = await photo.save();
    reply(null, { id : res });
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};