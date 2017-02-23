import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';

import { User } from '../database';

export default async (msg, reply) => {
  const { username, password } = msg;
  let user: any = await User.findOne({ username });
  if (!user) {
    reply(new Error('invalidUser'), null);
    return;
  } else {
    const result = await bcrypt.compare(password, user.password);
    if (result === true) {
      reply(null, _.omit(user, 'password'));
    } else {
      reply(new Error('wrongPassword'), null);
    }
  }
};