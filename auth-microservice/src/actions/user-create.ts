import * as bcrypt from 'bcryptjs';

import User from '../model';

export default async (msg, reply) => {

  const { username, password, email } = msg;
  let hashedPassword = await bcrypt.hash(password, 10);

  /* check if user already exists */
  const result: User = await User.retrieve({ username });

  if (result) {
    reply(new Error('alreadyExist'), null);
    return;
  }

  /* create new user */
  const user = new User({ username, password: hashedPassword, email });
  try {
    let res = await user.save();
    reply(null, { id: res });
  } catch (e) {
    reply(new Error('databaseError'), null);
  }

};