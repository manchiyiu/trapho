import Photo from '../model';
import {retrieveUser, retrieveUsersByNames, retrieveLocation, retrieveLocationsByNames, retrieveLikes, retrieveComments} from '../utils';
import * as _ from 'lodash';

export default async(msg, reply) => {
  let batchSize : number;
  let batchNo: number;
  const { username, locationName, timestamp } = msg;
  const delim = ',';
  let query:any = {};

  try {
    batchSize = Number(msg.count);
  } catch (e) {
    batchSize = -1;
  }

  try {
    batchNo = Number(msg.skip);
  } catch (e) {
    batchNo = -1;
  }

  try {

    if (!_.isNumber(batchSize) || batchSize <= 0) {
      throw new Error("invalidBatchSize");
    }
    if (!_.isNumber(batchNo) || batchNo < 0) {
      throw new Error("invalidBatchNo");
    }

    let users : any = {};
    let locations : any = {};
    let index;

    if (_.isString(username) && username.trim().length > 0){
      // Split search string to keywords
      let usernames_raw = username.trim().split(delim);
      let usernames = [];
      // Trim each keyword
      for(index = 0; index < usernames_raw.length; index++){
        if(usernames_raw[index].trim().length > 0){
          usernames.push(usernames_raw[index].trim());
        }
      }
      // Retrieve users
      let users_search =  await retrieveUsersByNames(usernames);
      query.userId = {};
      query.userId.$in = [];

      // Put userIds into one array in query object
      for(index = 0; index < users_search.length; index++){
        query.userId.$in.push(users_search[index].id);
        users[users_search[index].id] = users_search[index];
      }
    }

    if(_.isString(locationName) && locationName.trim().length > 0){
      // Split search string to keywords
      let locationNames_raw = locationName.trim().split(delim);
      let locationNames = [];
      // Trim each keyword
      for(index = 0; index < locationNames_raw.length; index++){
        if(locationNames_raw[index].trim().length > 0){
          locationNames.push(locationNames_raw[index].trim());
        }
      }
      // Retrieve locations
      let locations_search = await retrieveLocationsByNames(locationNames);
      query.locationId = {};
      query.locationId.$in = [];
      // Put locationIds into one array in query object
      for(index = 0; index < locations_search.length; index++){
        query.locationId.$in.push(locations_search[index].id);
        locations[locations_search[index].id] = locations_search[index];
      }
    }
    if(_.isString(timestamp)){
      let stTime = new Date(timestamp);
      let endTime = new Date(timestamp);
      if(stTime.getTime() <= 0 || !_.isFinite(stTime.getTime())){
        throw new Error("timestampError");
      }
      stTime.setHours(0,0,0,0);
      endTime.setHours(23,59,59,999);
      query.timestamp = {};
      query.timestamp.$gte = stTime;
      query.timestamp.$lte = endTime;
    }
    let photos : [any] = await Photo.retrieveMany(query, batchSize, batchNo);

    for (index = 0; index < photos.length; index++) {
      let photo = photos[index];
      let casted_photo: any = {};
      
      casted_photo.id = photo.id;
      casted_photo.timestamp = photo.timestamp;
      casted_photo.url = photo.url;
      casted_photo.description = photo.description;

      if (_.isUndefined(users[photo.userId])) {
        users[photo.userId] = await retrieveUser(photo.userId);
      }
      casted_photo.username = users[photo.userId].username;

      if (_.isUndefined(locations[photo.locationId])) {
        locations[photo.locationId] = await retrieveLocation(photo.locationId);
      }

      casted_photo.locationName = locations[photo.locationId].name;
      casted_photo.likesCount = await retrieveLikes(photo.id);
      casted_photo.comments = await retrieveComments(photo.id);

      photos[index] = casted_photo;
    };
    reply(null, {photos});
  } catch (e) {
    reply(e, null);
  }
}