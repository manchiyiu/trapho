import Comment from '../model-comment';

export default async (msg, reply) => {
  const { commentId } = msg;

  try{
    await Comment.retrieveById(commentId);
  } catch(e) {
    reply(e, null);
    return;
  }

  try{
    await Comment.remove(commentId);
    reply(null, { id: commentId });
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};