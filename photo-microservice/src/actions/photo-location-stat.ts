import Photo from '../model';

export default async (msg, reply) => {
    const { locationIds } = msg;
    try{
        let result = await Photo.retrieveLocationStat(locationIds);
        reply(null, { stats: result });
    }catch(e){
        reply(e, null);
    }
};