import { User } from '../database';

export default async (msg, reply) => {
  const { username, password } = msg;
  let user = await User.findOne({ username, password });
  if (!user) {
    reply(new Error('invalidUser'), null);
    return;
  }
  reply(null, user);
};