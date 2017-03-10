import Location from '../model';

export default async (msg, reply) => {

  const { locationId } = msg;
  try {
    let result = await Location.removeById(locationId);
    reply(null, { id: locationId });
  } catch (e) {
    reply(e, null);
  }

};