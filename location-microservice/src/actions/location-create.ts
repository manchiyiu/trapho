import Location from '../model'

export default async (msg, reply) => {
  const{name, description, tags, coordinates} = msg;
  var objCoordinate;
  if(typeof coordinates != "undefined" && coordinates.lng >= -180 && coordinates.lng <= 180 && coordinates.lat >= -90 && coordinates.lat <= 90){
    objCoordinate = [coordinates.lng, coordinates.lat];
  }else{
    reply(new Error('invalidCoordinatesError'), null);
    return;
  }
  if(typeof name === "undefined"){
    reply(new Error('invalidNameError'), null);
    return;
  }
  if(typeof description === "undefined"){
    reply(new Error('invalidDescriptionError'), null);
    return;
  }
  if(typeof tags === "undefined"){
    reply(new Error('invalidTagsError'), null);
    return;
  }
  const location = new Location({name, description, tags, coordinates:objCoordinate});
  let result = await location.save();
  reply(null, {id: String(result)});
};


