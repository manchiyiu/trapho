export default async (msg, reply) => {
  const { tripId } = msg;
  // Return mock data
  reply(null, { id: tripId });
};