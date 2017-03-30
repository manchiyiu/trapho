import User from '../model';
import * as _ from 'lodash';

export default async (msg, reply) => {
  const { userId, query } = msg;

  try{
    if(!_.isUndefined(query)){
      let users = await User.retrieveMany(query, Infinity);
      users.map(user => {
        return _.omit(user, 'password');
      });
      reply(null, users);
    }else{
      const user: User = await User.retrieveById(userId);
      reply(null, _.omit(user, 'password'));
    }
  } catch(e) {
    reply(new Error('userNotExist'), null);
  }

}

