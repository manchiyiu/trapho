import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';

import User from '../model';

export default async (msg, reply) => {

  const { username, password } = msg;
  const user: User = await User.retrieve({ username });

  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result === true) {
      reply(null, _.omit(user, 'password'));
      return;
    } else {
      reply(new Error('wrongPassword'), null);
      return;
    }
  }

  reply(new Error('invalidUser'), null);

};