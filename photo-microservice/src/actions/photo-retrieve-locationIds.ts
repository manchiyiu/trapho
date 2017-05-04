import Photo from '../model';

// action to retrieve the list of locationIds by a list of photoId
export default async(msg, reply) => {
  const {photoIds} = msg;
  try {
    let locationIds = await Photo.retrieveLocationIds(photoIds);
    reply(null, {locationIds});
  } catch (e) {
    reply(e, null); // propagate the error to send if any
  }
}