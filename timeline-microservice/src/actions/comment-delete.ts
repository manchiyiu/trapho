export default async (msg, reply) => {
  const { commentId } = msg;
  reply(null, { id: commentId });
};