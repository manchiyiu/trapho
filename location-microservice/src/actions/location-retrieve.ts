import * as _ from 'lodash';
import Location from '../model-location';
import { getPhotoCount, getPhotoCounts } from '../utils';

export default async (msg, reply) => {

  const { locationId, query, photoCount } = msg;
  let searchQuery: any = {};

  if (!_.isUndefined(locationId)) {
    try {
      let result:any = await Location.retrieveById(locationId);
      if(_.isBoolean(photoCount) && photoCount){
        result.photoCount = await getPhotoCount(locationId);
      }
      reply(null, { locations: result }); // just return one object
      return;
    } catch (e) {
      reply(e, null);
      return;
    }
  }

  if (_.isUndefined(query)) {
    reply(new Error('invalidQuery'), null);
    return;
  }

  if (_.isString(query.name)) {
    searchQuery.name = new RegExp(query.name, 'i');
  }

  if (_.isArray(query.tags)) {
    searchQuery.tags = {};
    searchQuery.tags.$elemMatch = {};
    searchQuery.tags.$elemMatch.$in = query.tags;
  }

  let locations:[any];
  try {

    if (!_.isUndefined(query.range)) {
      if (
        query.range.lng < -180 || query.range.lng > 180 ||
        query.range.lat < -90 || query.range.lat > 90
      ) {
        throw new Error('invalidCoordinatesError');
      }

      let coordinates = [query.range.lng, query.range.lat];
      locations = await Location.retrieveManyByDist(
        searchQuery, coordinates, query.range.radius, Infinity
      );
    }else{
      locations = await Location.retrieveMany(searchQuery, Infinity);
    }
    if(_.isBoolean(query.photoCount) && query.photoCount && locations.length > 0){
      let locationIds = [];
      let locationMap:any = {};
      locations.forEach(
        location => {
          locationIds.push(location.id);
          locationMap[location.id] = location;
        }
      );
      let stats:[any] = await getPhotoCounts(locationIds);
      stats.forEach(
        stat => {
          locationMap[stat._id].photoCount = stat.photoCount;
        }
      );
    }
    reply(null, { locations });

  } catch (e) {
    reply(e, null);
  }

};