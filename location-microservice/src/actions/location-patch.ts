import Location from '../model'
import {checkName, checkDescription, checkTags, checkCoordinates} from '../utils'

export default async (msg, reply) => {
  const{locationId, coordinates, name, description, tags} = msg;
  var location
  try{
    location = await Location.retrieveById(locationId)
  }catch(e){
    reply(e, null);
    return;
  }

  try{
      if(checkName(name, true)){
        location.name = name;
      }
      if(checkDescription(description, true)){
        location.description = description;
      }
      if(checkTags(tags, true)){
        location.tags = tags;
      }
      if(checkCoordinates(coordinates, true)){
        location.coordinates = [coordinates.lng, coordinates.lat];
      }
  }catch(e){
    reply(e, null);
    return;
  }

  try{
    let result = await location.update();
    reply(null, {id: locationId});
  }catch(e){
    reply(e, null);
  }

};