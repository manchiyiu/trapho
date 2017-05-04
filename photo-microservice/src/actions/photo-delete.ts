import Photo from '../model';

// action to delete a photo
export default async (msg, reply) => {
  const { photoId } = msg;

  // validate photoId first
  try {
    await Photo.retrieveById(photoId);
  } catch(e) {
    // photo not exist
    reply(e, null);  // propagate the error to send if any
    return;
  }

  try {
    await Photo.remove(photoId);
    reply(null, { id: photoId });
  } catch(e) {
    reply(new Error('databaseError'), null);
  }

};