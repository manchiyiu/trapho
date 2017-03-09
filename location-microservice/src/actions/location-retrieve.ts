import Location from '../model'

export default async (msg, reply) => {
  const{locationId, query} = msg;
  let searchQuery = {};
  if(typeof locationId != "undefined"){
    try{
      let result = await Location.retrieveById(locationId);
      reply(null, {locations:result});
      return;
    }catch(e){
      reply(e, null);
      return;
    }
  }
  if(typeof query === "undefined"){
    reply(new Error("invalidQuery"), null);
    return;
  }
  if(typeof query["name"] != "undefined"){
    searchQuery["name"] = new RegExp(query["name"], "i");
  }
  if(typeof query["tags"] != "undefined"){
    searchQuery["tags"] = {};
    searchQuery["tags"]["$elemMatch"]= {};
    searchQuery["tags"]["$elemMatch"]["$in"]= query["tags"];
  }
  try{
    if(typeof query["range"] != "undefined"){
      if(query["range"].lng < -180 || query["range"].lng > 180 || query["range"].lat < -90 || query["range"].lat > 90){
        throw new Error("invalidCoordinatesError");
      }
      let coordinates = [query["range"].lng, query["range"].lat];
      let result = await Location.retrieveManyByDist(searchQuery, coordinates, query["range"].radius, Infinity);
      reply(null, {locations:result});
    }else{
      let result = await Location.retrieveMany(searchQuery, Infinity);
      reply(null, {locations:result});
    }
  }catch(e){
    reply(e, null);
  }
};