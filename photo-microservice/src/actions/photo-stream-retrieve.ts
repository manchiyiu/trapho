import Photo from '../model';
import {retrieveUser, retrieveLocation, retrieveLikes, retrieveComments} from '../utils';
import * as _ from 'lodash';

export default async(msg, reply) => {
  let batchSize : number;
  let batchNo: number;

  try {
    batchSize = Number(msg.batchSize);
  } catch (e) {
    batchSize = -1;
  }

  try {
    batchNo = Number(msg.batchNo);
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
    let photos : [any] = await Photo.retrieveMany({}, batchSize, batchNo);

    let index;
    for (index = 0; index < photos.length; index++) {
      let photo = photos[index];
      let casted_photo: any = {};
      console.log(casted_photo);
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