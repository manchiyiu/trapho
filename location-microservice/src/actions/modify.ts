import * as _ from 'lodash';

import Location from '../model'

export default async (msg, reply) => {
    const id = msg.id;
    if(typeof id == "undefined"){
        reply(new Error("invalidLocationIDError"), null);
        return;
    }
    const location: Location = await Location.retrieve({"_id": id})
    if(location){
        for(var index in location){
            if(typeof msg[index] != "undefined"){
                location[index] = msg[index];
            }
        }
        try{
            let result = await location.update();
            reply(null, null);
        }catch(e){
            reply(new Error("databaseError"), null);
        }
    }else{
        reply(new Error("invalidLocationIDError"), null);
    }
};