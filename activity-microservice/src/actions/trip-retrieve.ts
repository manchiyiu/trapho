import * as _ from 'lodash';
import Trip from '../model';
import { checkUser } from '../utils'

export default async (msg, reply) => {
    const { tripId, userId } = msg;
    try{
        if(_.isString(tripId)){
            let trip = await Trip.retrieveById(tripId);
            reply(null, { trip });
            return;
        }
        if(checkUser(userId, true)){
            let trips = await Trip.retrieveMany({ userId }, Infinity);
            reply(null, { trips });
            return;
        }
        throw new Error("invalidIdError");
    }catch(e){
        reply(e, null);
    }
};