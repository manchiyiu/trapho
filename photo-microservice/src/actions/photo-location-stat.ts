import Photo from '../model';

// action to retrieve the statistics of a location
export default async(msg, reply) => {
  const {locationIds} = msg;
  try {
    let result = await Photo.retrieveLocationStat(locationIds);
    reply(null, {stats: result});
  } catch (e) {
    reply(e, null); // propagate the error to send if any
  }
};