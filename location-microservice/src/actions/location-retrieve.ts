import Location from '../model'

export default async (msg, reply) => {
  const{locationId, query} = msg;
  let searchQuery = {};
  if(typeof locationId != "undefined"){
    try{
      let result = Location.retrieveById(locationId);
    }catch(e){
      reply(e, null);
      return;
    }
  }
  if(typeof query["name"] != "undefined"){
    searchQuery["name"] = new RegExp(name, "i");
  }
  if(typeof query["tags"] != "undefined"){
    searchQuery["tags"] = {};
    searchQuery["tags"]["$elemMatch"]= {};
    searchQuery["tags"]["$elemMatch"]["$in"]= query["tags"];
  }
  try{
    if(typeof query["range"] != "undefined"){
      if(query["range"].lng < -180 && query["range"].lng > 180 && query["range"].lat < -90 && query["range"].lat > 90){
        throw new Error("invalidCoordinatesError");
      }
      let coordinates = [query["range"].lng, query["range"].lat];
      const{radius} = query["range"];
      let result = await Location.retrieveManyByDist(searchQuery, coordinates, radius, Infinity);
      reply(null, {locations:result});
    }else{
      let result = await Location.retrieveMany(searchQuery, Infinity);
      reply(null, {locations:result});
    }
  }catch(e){
    reply(e, null);
  }
};