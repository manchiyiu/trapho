import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import Location from '../model-location';
import { checkUser, getLikedPhotoIds, getPhotosLocations } from '../utils'

export default async (msg, reply) => {
    const { userId } = msg;
    try{
        await checkUser(userId, false);
        let photoIds = await getLikedPhotoIds(userId);
        let locationIds:string[] = await getPhotosLocations(photoIds);
        let castedLocationIds:any[] = [];
        locationIds.forEach(locationId => castedLocationIds.push(new mongoose.Types.ObjectId(locationId)));
        let query:any = {
            "_id": {
                "$in": castedLocationIds
            }
        };
        let locations = await Location.retrieveMany(query, Infinity);
        reply(null, {locations});
    }catch(e){
        reply(e, null);
    }
}