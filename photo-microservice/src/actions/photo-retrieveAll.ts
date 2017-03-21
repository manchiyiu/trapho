import Photo from '../model';

export default async(msg, reply) => {
    try{
        let photos = await Photo.retrieveAll();
        reply(null, { photos } );
    } catch(e){
        reply(e, null);
    }
}