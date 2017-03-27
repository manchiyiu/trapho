import Like from '../model';


export default async (msg, reply) => {
  const {userId, photoId} = msg;

  let res : Like;
  try{
    res = await Like.retrieveUniquelyByQuery({userId, photoId});
  } catch(e) {
    reply(e, null);
    return;
  }

  Like.remove(res.id);

  reply(null, {id: res.id});
};