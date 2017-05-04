import Comment from '../model-comment';

// action to delete existing comment
export default async (msg, reply) => {
  const { commentId } = msg;

  // check if comment really exist by trying to retrieve the comment by commentId
  try {
    await Comment.retrieveById(commentId);
  } catch(e) {
    reply(e, null);  // propagate the error to send if any
    return;
  }

  // if yes, remove the comment
  try {
    await Comment.remove(commentId);
    reply(null, { id: commentId }); // reply to Sender: id of the removed comment
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
};