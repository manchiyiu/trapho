export default async (msg, reply) => {
  const { tripId } = msg;
  reply(null, { id:tripId });
};