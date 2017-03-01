import * as _ from 'lodash';

import Location from '../model';

export default async (msg, reply) => {
    const simpleSearchKeys = ["name", "description"]
    const rangeSearchKeys = ["rating", "numberRated"];

    var resultLimit = msg.resultLimit;
    const conditions = {};
    const {coordinates, maxDistance} = msg;

    if(typeof msg.id != "undefined"){
        conditions["_id"] = msg.id;
    }
    if(typeof resultLimit != "number"){
        resultLimit = Infinity;
    }
    if(typeof maxDistance != "undefined" && typeof coordinates === "undefined"){
        reply(new Error("unspecifiedCoordinatesError"), null);
    }else if(typeof coordinates != "undefined" && typeof maxDistance === "undefined"){
        conditions["coordinates"] = coordinates;
    }
    for(var i = 0; i<simpleSearchKeys.length; i++){
        simpleKeyParser(simpleSearchKeys[i])(conditions, msg[simpleSearchKeys[i]]);
    }
    for(var i = 0; i<rangeSearchKeys.length; i++){
        try{
            rangeKeyParser(rangeSearchKeys[i])(conditions, msg[rangeSearchKeys[i]]);
        }catch(e){
            reply(e, null);
            return;
        }
    }
    try{
        var result:Location[] = [];
        //result = await Location.retrieveMany(conditions, resultLimit);
        if(typeof maxDistance === "undefined"){
           result = await Location.retrieveMany(conditions, resultLimit);
        }else{
            result = await Location.retrieveManyByDist(conditions, coordinates, maxDistance, resultLimit);
        }
        reply(null, {result: result});
    }catch(e){
        reply(new Error('databaseError'), null);
    }
}

function simpleKeyParser(key){
    const verifier = function(conditions, value){
        if(typeof value != "undefined"){
            conditions[key] = new RegExp(value, "i");
        }
    }
    return verifier;
}

function rangeKeyParser(key){
    const verifier = function(conditions, expression){
        if(typeof expression != "undefined"){
            let splittedEx = expression.split(";");
            let condition = {};
            for(var i = 0; i<splittedEx.length; i++){
                let operator = splittedEx[i].substring(0,2);
                let value = parseInt(splittedEx[i].substring(2));
                if(operator == ">="){
                    condition["$gte"] = value;
                }else if(operator == ">>"){
                    condition["$gt"] = value;
                }else if(operator == "<="){
                    condition["$lte"] = value;
                }else if(operator == "<<"){
                    condition["$lt"] = value;
                }else if(operator == "=="){
                    condition["$eq"] = value;
                }else{
                    throw new Error("unknownRangeOperator");
                }
            }
            conditions[key] = condition;
        }
    }
    return verifier;
}