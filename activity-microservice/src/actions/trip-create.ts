import Trip from '../model';
import { checkName, checkUser, checkTimestamp, checkLocations, checkDate } from '../utils';

export default async (msg, reply) => {
  const { name, userId, timestamp, locations, startDate, endDate } = msg;
  try{
    checkName(name, false);
    await checkUser(userId, false);
    checkTimestamp(timestamp, false);
    checkDate(startDate, false);
    checkDate(endDate, false);
    await checkLocations(locations, false);
    let trip = new Trip({ name, userId, timestamp, locations, startDate, endDate });
    let result = await trip.save();
    reply(null, { id : String(result) });
  }catch(e){
    reply(e, null);
  }
};