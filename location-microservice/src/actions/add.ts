import * as _ from 'lodash';


import Location from '../model'

export default async (msg, reply) => {
    const{name, coordinates, description} = msg;
    const location = new Location({name, coordinates, description});
    try{
        let result = await location.save();
        console.log("Result:", result);
        console.log("Type:", typeof result);
        reply(null, String(result));
    }catch(e){
        reply(new Error('databaseError'), null);
    }
};