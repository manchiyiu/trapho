import * as _ from 'lodash';

import Location from '../model';

export default async (msg, reply) => {
    const simpleSearchKeys = ["name", "coordinates", "description"];
    const strictResult = [false, true, false];
    const rangeSearchKeys = ["rating", "personRated"];

    var resultLimit = msg.resultLimit;
    const conditions = {};

    if(typeof msg.id != "undefined"){
        conditions["_id"] = msg.id;
    }
    if(typeof resultLimit != "number"){
        resultLimit = Infinity;
    }
    for(var i = 0; i<simpleSearchKeys.length; i++){
        simpleKeyParser(simpleSearchKeys[i])(conditions, msg[simpleSearchKeys[i]], strictResult[i]);
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
        const result:Location[] = await Location.retrieveMany(conditions, resultLimit);
        reply(null, {result: result});
    }catch(e){
        reply(new Error('databaseError'), null);
    }
}

function simpleKeyParser(key){
    const verifier = function(conditions, value, strictResult){
        if(typeof value != "undefined"){
            if(strictResult){
                conditions[key] = value;
            }else{
                conditions[key] = new RegExp(value, "i");
            }
            
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