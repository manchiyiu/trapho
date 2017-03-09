import Location from '../model'
export default async (msg, reply) => {
  const{locationId, coordinates} = msg;
  let optParameters = ["name", "description", "tags"];
  var location
  try{
    location = await Location.retrieveById(locationId)
  }catch(e){
    reply(e, null);
    return;
  }

  if(typeof coordinates != "undefined"){
    if(coordinates.lng >= -180 && coordinates.lng <= 180 && coordinates.lat >= -90 && coordinates.lat <= 90){
      let objCoordinate = [coordinates.lng, coordinates.lat];
      location.coordinates = objCoordinate;
    }else{
      reply(new Error("invalidCoordinatesError"), null);
      return;
    }
  }
  try{
    optParameters.forEach(item => fieldEditor(item)(location, msg));
  }catch(e){
    reply(e, null);
    return;
  }
  
  try{
    let result = await location.update();
    reply(null, {id: String(result)});
  }catch(e){
    reply(new Error("databaseError"), null);
  }

};

function fieldEditor(key){
  const editor = function(obj, msg){
    if(typeof msg[key] != "undefined"){
      obj[key] = msg[key];
    }else{
      throw(new Error("invalid"+key.charAt(0).toUpperCase()+key.slice(1)+"Error"));
    }
  }
  return editor;
}