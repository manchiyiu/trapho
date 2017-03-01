import * as _ from 'lodash';

import Location from '../model';

export default async (msg, reply) => {
    const {id, photoID} = msg;
    if(typeof id == "undefined"){
        reply(new Error("invalidLocationIDError"), null);
        return;
    }
    if(typeof photoID == "undefined"){
        reply(new Error("invalidPhotoIDError"), null);
    }
    const location: Location = await Location.retrieve({"_id": id})
    // TODO: Add logic to check validity of photoID
    if(location){
        if(typeof location.photoRated[photoID] == "undefined"){
            reply(new Error("NotRatedError"), null);
            return;
        }
        location.rating = (location.rating*location.personRated - location.photoRated[photoID])/(location.personRated-1);
        location.personRated -= 1;
        delete location.photoRated[photoID];
        try{
            let result = await location.update();
            reply(null, {rating: location.rating, personRated: location.personRated});
        }catch(e){
            reply(new Error("databaseError"), null);
        }
    }else{
        reply(new Error("invalidLocationIDError"), null);
    }
}