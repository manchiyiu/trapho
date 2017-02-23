import { User } from '../database';

export default async (msg, reply) => {
  const { username, password } = msg;
  let user = await User.findOne({ username, password });
  if (!user) {
    reply(null, { err: 'invalidUser' });
    return;
  }
  reply(null, { err: null, user });
};