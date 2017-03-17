import Trip from '../model';

export default async (msg, reply) => {
  const { tripId } = msg;
  try{
    let result = await Trip.removeById(tripId);
    reply(null, { id : tripId });
  }catch(e){
    reply(e, null);
  }
};