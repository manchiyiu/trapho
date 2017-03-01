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
            reply(new Error("notRatedError"), null);
            return;
        }
        if(location.numberRated - 1 > 0){
            location.rating = (location.rating*location.numberRated - location.photoRated[photoID])/(location.numberRated-1);
        }else{
            location.rating = 0;
        }
        location.numberRated -= 1;
        delete location.photoRated[photoID];
        try{
            let result = await location.update();
            reply(null, {rating: location.rating, numberRated: location.numberRated});
        }catch(e){
            reply(new Error("databaseError"), null);
        }
    }else{
        reply(new Error("invalidLocationIDError"), null);
    }
}