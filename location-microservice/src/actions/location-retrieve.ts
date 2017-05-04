import * as _ from 'lodash';
import Location from '../model-location';
import { getPhotoCount, getPhotoCounts } from '../utils';

// action to retrieve location by a search query
export default async (msg, reply) => {

  const { locationId, query, photoCount } = msg;
  let searchQuery: any = {};

  // retrieve the location by the locationId
  if (!_.isUndefined(locationId)) {
    try {
      let result:any = await Location.retrieveById(locationId);
      if (_.isBoolean(photoCount) && photoCount) {
        result.photoCount = await getPhotoCount(locationId); // get the photo count of a location
      }
      reply(null, { locations: result }); // just return one object
      return;
    } catch (e) {
      reply(e, null);  // propagate the error to send if any
      return;
    }
  }

  // check if the query object is really valid

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
        query.range.lng < -180 || query.range.lng > 180 || // a valid longitude
        query.range.lat < -90 || query.range.lat > 90 // a valid latitude
      ) {
        throw new Error('invalidCoordinatesError');
      }

      let coordinates = [query.range.lng, query.range.lat];
      locations = await Location.retrieveManyByDist( // retrieve a list of location by distance and a center
        searchQuery, coordinates, query.range.radius, Infinity
      );
    } else {
      locations = await Location.retrieveMany(searchQuery, Infinity); // retrieve a list of location by search query
    }
    if (_.isBoolean(query.photoCount) && query.photoCount && locations.length > 0) {
      let locationIds = [];
      let locationMap:any = {};
      locations.forEach(
        location => {
          locationIds.push(location.id); // store the locationId
          locationMap[location.id] = location;
        }
      );
      let stats:[any] = await getPhotoCounts(locationIds); // retrieve photoCounts by an array of locationId
      stats.forEach(
        stat => {
          locationMap[stat._id].photoCount = stat.photoCount; // append photoCount to that location
        }
      );
    }
    reply(null, { locations }); // reply to Sender: a list of locations matching the query

  } catch (e) {
    reply(e, null);  // propagate the error to send if any
  }

};