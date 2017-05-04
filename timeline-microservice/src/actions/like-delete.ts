import Like from '../model-like';

// action to delete existing like
export default async (msg, reply) => {
  const {userId, photoId} = msg;

  let res : Like;

  try {
    res = await Like.retrieveUniquelyByQuery({userId, photoId}); // try to retrieve the like by userId + photoId
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
    return;
  }

  Like.remove(res.id); // ask database to remove it

  reply(null, {id: res.id}); // return the id of the like deleted
};