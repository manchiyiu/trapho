import * as _ from 'lodash';


import Location from '../model'

export default async (msg, reply) => {
    const{name, coordinates, description} = msg;
    if(typeof coordinates === "undefined" || coordinates[0] > 180 || coordinates[0] < -180 || coordinates[1] > 90 || coordinates[1] < -90){
        reply(new Error("invalidCoordinatesError"), null);
        return;
    }
    const location = new Location({name, coordinates, description});
    try{
        let result = await location.save();
        reply(null, {result: String(result)});
    }catch(e){
        reply(new Error('databaseError'), null);
    }
};