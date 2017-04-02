import Photo from '../model';

export default async(msg, reply) => {
    const { photoIds } = msg;
    try{
        let locationIds = await Photo.retrieveLocationIds(photoIds);
        reply(null, { locationIds } );
    } catch(e){
        reply(e, null);
    }
}