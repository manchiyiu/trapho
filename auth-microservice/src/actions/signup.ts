import { User } from '../database';

export default async (msg, reply) => {
  let { username, password } = msg;
  /* check if user already exists */
  let result = await User.findOne({ username });
  if (result) { /* user already exist */
    reply(null, { err: 'alreadyExist' });
    return;
  }
  /* create new user */
  const user = new User({ username, password });
  try {
    await user.save();
    reply(null, { err: null });
  } catch (e) {
    reply(null, { err: 'databaseError' });
  }
};