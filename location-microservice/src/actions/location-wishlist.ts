import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import Location from '../model-location';
import {checkUser, getLikedPhotoIds, getPhotosLocations} from '../utils'

// action to retrieve the user's wishlist by userId

export default async(msg, reply) => {
  const {userId} = msg;
  try {

    // check if input are valid
    await checkUser(userId, false);

    let photoIds = await getLikedPhotoIds(userId); // get user's liked photo by userId
    let locationIds : string[] = await getPhotosLocations(photoIds); // get a list of locationIds by an array of photoIds

    let castedLocationIds : any[] = [];
    locationIds.forEach(locationId => castedLocationIds.push(new mongoose.Types.ObjectId(locationId)));
    let query : any = {
      "_id": {
        "$in": castedLocationIds
      }
    };
    let locations = await Location.retrieveMany(query, Infinity); // retrieve all locations by the list of locationId obtained above
    reply(null, {locations}); // reply to Sender: the list of locations in the user's wishlist
  } catch (e) {
    reply(e, null); // propagate the error to send if any
  }
}