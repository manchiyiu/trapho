import Photo from '../model';
import {retrieveUser, retrieveUsersByNames, retrieveLocation, retrieveLocations, retrieveLikes, retrieveComments, retrieveRating} from '../utils';
import * as _ from 'lodash';

// action to retrieve list of photos for the photo feed, filterable by username, userId, locationName, timestamp, tags, locationId, photoTags, etc.
export default async(msg, reply) => {

  let batchSize : number;
  let batchNo: number;
  const { username, userId, locationName, timestamp, tags, locationId, photoTags } = msg;
  const delim = ',';
  let query:any = {};

  // if batch size is not set, default to -1
  try {
    batchSize = Number(msg.count);
  } catch (e) {
    batchSize = -1;
  }

  // if batch number is not set, default to -1
  try {
    batchNo = Number(msg.skip);
  } catch (e) {
    batchNo = -1;
  }

  try {

    // check if input are valid, if valid, add it to become part of the query

    if (!_.isNumber(batchSize) || batchSize <= 0) {
      throw new Error("invalidBatchSize");
    }
    if (!_.isNumber(batchNo) || batchNo < 0) {
      throw new Error("invalidBatchNo");
    }

    let users : any = {};
    let locations : any = {};
    let index;
    let locationNames = [], tags_search = [];

    if (_.isString(username) && username.trim().length > 0) {
      // Split search string to keywords
      let usernames_raw = username.trim().split(delim);
      let usernames = [];
      // Trim each keyword
      for(index = 0; index < usernames_raw.length; index++) {
        if (usernames_raw[index].trim().length > 0) {
          usernames.push(usernames_raw[index].trim());
        }
      }
      // Retrieve users
      let users_search = await retrieveUsersByNames(usernames);
      query.userId = {};
      query.userId.$in = [];

      // Put userIds into one array in query object
      for(index = 0; index < users_search.length; index++) {
        query.userId.$in.push(users_search[index].id);
        users[users_search[index].id] = users_search[index];
      }
    }

    if (_.isString(userId) && userId.trim().length > 0) {
      if (!query.userId) {
        query.userId = {};
        query.userId.$in = [];
      }
      query.userId.$in.push(userId.split(delim).filter(i => i.length > 0));
    }

    if (_.isString(tags) && tags.trim().length > 0) {
      let tags_raw = tags.trim().split(delim);
      for(index = 0; index < tags_raw.length; index++) {
        if (tags_raw[index].trim().length > 0) {
          tags_search.push(tags_raw[index]);
        }
      }
    }

    if (_.isString(locationName) && locationName.trim().length > 0) {
      // Split search string to keywords
      let locationNames_raw = locationName.trim().split(delim);
      // Trim each keyword
      for(index = 0; index < locationNames_raw.length; index++) {
        if (locationNames_raw[index].trim().length > 0) {
          locationNames.push(locationNames_raw[index].trim());
        }
      }
    }

    if (locationNames.length > 0 || tags_search.length > 0) {
      // Retrieve locations
      let locations_search = await retrieveLocations(locationNames, tags_search);
      query.locationId = {};
      query.locationId.$in = [];
      // Put locationIds into one array in query object
      for(index = 0; index < locations_search.length; index++) {
        query.locationId.$in.push(locations_search[index].id);
        locations[locations_search[index].id] = locations_search[index];
      }
    }

    // if timestamp is set
    if (_.isString(timestamp)) {
      let stTime = new Date(timestamp);
      let endTime = new Date(timestamp);
      if (stTime.getTime() <= 0 || !_.isFinite(stTime.getTime())) {
        throw new Error("timestampError");
      }
      stTime.setHours(0,0,0,0); // start of a day
      endTime.setHours(23,59,59,999); // end of a day
      query.timestamp = {};
      query.timestamp.$gte = stTime; // use the timestamp to specify the query
      query.timestamp.$lte = endTime;
    }

    if (_.isString(locationId)) {
      query.locationId = locationId;
    }

    if (_.isString(photoTags) && photoTags.trim().length > 0) {
      // filter by photo tags
      query.photoTags = {};
      query.photoTags.$elemMatch = {};
      query.photoTags.$elemMatch.$in = [];
      photoTags.trim().split(delim).forEach(
        photoTag => {
          if (photoTags.trim().length > 0) {
            query.photoTags.$elemMatch.$in.push(photoTag.trim());
          }
        }
      );
    }

    let photos : [any] = await Photo.retrieveMany(query, batchSize, batchNo); // retrieve photos the query
    let result = await Promise.all(photos.map(
      async photo => { // convert the retrieved photo to the desired format
        let casted_photo: any = {};
        casted_photo.id = photo.id;
        casted_photo.timestamp = photo.timestamp;
        casted_photo.url = photo.url;
        casted_photo.description = photo.description;

        // retrieve user by user id and attach it to the user
        if (_.isUndefined(users[photo.userId])) {
          users[photo.userId] = retrieveUser(photo.userId);
        }

        // retrieve location by location id and attach it to the photo
        if (_.isUndefined(locations[photo.locationId])) {
          locations[photo.locationId] = retrieveLocation(photo.locationId);
        }

        // retrieve comment by photo id and attach it to the photo
        casted_photo.comments = await retrieveComments(photo.id);
        casted_photo.comments.forEach(
          comment => {
            if (_.isUndefined(users[comment.userId])) {
              users[comment.userId] = retrieveUser(comment.userId);
            }
          }
        );

        // retrieve likes by photo id and attach it to the photo
        casted_photo.likesCount = await retrieveLikes(photo.id);
        casted_photo.username = (await users[photo.userId]).username;
        casted_photo.userId = photo.userId;
        casted_photo.locationName = (await locations[photo.locationId]).name;

        casted_photo.locationId = photo.locationId;
        casted_photo.locationTags = (await locations[photo.locationId]).tags;
        casted_photo.photoTags = photo.photoTags;

        // serialize the comments object obtained
        let casted_comments = await Promise.all(casted_photo.comments.map(
          async comment => {
            comment.username = (await users[comment.userId]).username;
            return comment;
          }
        ));

        // retrieve the rating of the photo and attached it to the photo
        casted_photo.rating = await retrieveRating(casted_photo.userId, casted_photo.locationId, casted_photo.id);
        return casted_photo;

      }
    ));

    reply(null, {photos: result}); // Reply to Sender: lists of photos for photo feed

  } catch (e) {
    reply(e, null);  // propagate the error to send if any
  }
}