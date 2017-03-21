import User from '../model';
import * as _ from 'lodash';

export default async (msg, reply) => {
  const { userId } = msg;

  try{
    const user: User = await User.retrieveById(userId);
    reply(null, _.omit(user, 'password'));
  } catch(e) {
    reply(new Error('userNotExist'), null);
  }

}

