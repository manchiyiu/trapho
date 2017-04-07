import User from '../model';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';

export default async (msg, reply) => {
  const { userId, password, email } = msg;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch(e) {
    reply(new Error('passwordInvalid'));
  }

  try{
    const user: User = await User.retrieveById(userId);
    user.password = hashedPassword;
    if(!_.isUndefined(email)){
      user.email = email;
    }
    user.patch();
    reply(null, { "id": userId });
  } catch(e) {
    reply(new Error('userNotExist'), null);
  }
}