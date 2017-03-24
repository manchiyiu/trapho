import Photo from '../model';
import { retrieveUser, retrieveLocation, retrieveLikes, retrieveComments } from '../utils';
import * as _ from 'lodash';

export default async(msg, reply) => {
    const { batchSize, batchNo } = msg;
    try{
        if(!_.isNumber(batchSize) || batchSize <= 0){
            throw new Error("invalidBatchSize");
        }
        if(!_.isNumber(batchNo) || batchNo < 0){
            throw new Error("invalidBatchNo");
        }
        let users:any = {};
        let locations:any = {};
        let photos:[any] = await Photo.retrieveMany({}, batchSize, batchNo);
        photos.forEach(async photo => {
            if(_.isUndefined(users[photo.userId])){
                users[photo.userId] = await retrieveUser(photo.userId);
            }
            photo.username = users[photo.userId].username;

            if(_.isUndefined(locations[photo.locationId])){
                locations[photo.locationId] = await retrieveLocation(photo.locationId);
            }
            photo.locationName = locations[photo.locationId].name;

            photo.likesCount = await retrieveLikes(photo.id);
            
            photo.comments = await retrieveComments(photo.id);
        });
        reply(null, { photos });
    }catch(e){
        reply(e, null);
    }
}