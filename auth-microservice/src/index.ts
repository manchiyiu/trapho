import { seneca } from './utils';
import { User } from './database';

/* method for login */

seneca.add('cmd:login', async (msg, reply) => {
  const { username, password } = msg;
  let user = await User.findOne({ username, password });
  if (!user) {
    reply(new Error('invalid user'), null);
    return;
  }
  reply(null, user);
});

seneca.add('cmd:signup', async (msg, reply) => {
  let { username, password } = msg;
  const test = new User({ username, password });
  try {
    const result = await test.save();
  } catch (e) {
    console.error(e);
  }
});

seneca.add('cmd:deserialize', async (msg, reply) => {
  const { userId } = msg;
  let result = await User.findOne({ _id: userId });
  if (!result) {
    reply(new Error('invalid user'), null);
    return;
  }
  reply(null, result);
});

seneca.listen();
