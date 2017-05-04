import Photo from '../model';

// action to retrieve a list of all photos
export default async(msg, reply) => {
  try {
    let photos = await Photo.retrieveAll();
    reply(null, {photos});
  } catch (e) {
    reply(e, null); // propagate the error to send if any
  }
}