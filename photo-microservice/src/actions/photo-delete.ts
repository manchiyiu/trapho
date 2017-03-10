import Photo from '../model';

export default async (msg, reply) => {
  const { photoId } = msg;

  // validate photoId first
  try{
    await Photo.retrieveById(photoId);
  } catch(e) {
    // photo not exist
    reply(e, null);
    return;
  }

  try{
    await Photo.remove(photoId);
    reply(null, { id : photoId });
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
  
};