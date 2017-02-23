import { User } from '../database';

export default async (msg, reply) => {
  const { userId } = msg;
  try {
    let user = await User.findOne({ _id: userId });
    if (!user) {
      reply(null, { err: 'invalidUser' });
      return;
    } else {
      reply(null, { err: null, user });
    }
  } catch (e) {
    reply(null, { err: 'databaseError' });
  }
};