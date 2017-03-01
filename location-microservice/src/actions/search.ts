import * as _ from 'lodash';

import Location from '../model';

export default async (msg, reply) => {
    const resultLimit = msg.resultLimit;
    const simpleSearchKeys = ["name", "coordinates", "description"];
    const conditions = {};
    if(typeof msg.id != "undefined"){
        conditions["_id"] = msg.id;
    }
    for(var i = 0; i<simpleSearchKeys.length; i++){
        simpleKeysParser(simpleSearchKeys[i])(conditions, msg[simpleSearchKeys[i]]);
    }
    try{
        const result:Location[] = await Location.retrieveMany(conditions);
        reply(null, {result: result});
    }catch(e){
        reply(new Error('databaseError'), null);
    }
}

function simpleKeysParser(key){
    const verifier = function(conditions, value){
        if(typeof value != "undefined"){
            conditions[key] = value;
        }
    }
    return verifier;
}