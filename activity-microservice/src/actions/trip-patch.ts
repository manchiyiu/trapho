import Trip from '../model';
import { checkName, checkUser, checkTimestamp, checkLocations } from '../utils'

export default async (msg, reply) => {
  const { tripId, name, userId, timestamp, locations } = msg;
  try{
    let trip = await Trip.retrieveById(tripId);
    if(checkName(name, true)){
      trip.name = name;
    }
    if(await checkUser(userId, true)){
      trip.userId = userId;
    }
    if(checkTimestamp(timestamp, true)){
      trip.timestamp = timestamp;
    }
    if(await checkLocations(locations, true)){
      trip.locations = locations;
    }
    await trip.update();
    reply(null, { id : tripId });
  }catch(e){
    reply(e, null);
  }
};