import User from '../model';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';

export default async (msg, reply) => {
  const { userId, password, email } = msg;
  let hashedPassword;
  var anyModified = false;
  try {
    if(_.isString(password)){
      if(password.length  == 0){
        throw new Error('passwordInvalid');
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }
  } catch(e) {
    reply(new Error('passwordInvalid'));
    return;
  }

  try{
    const user: User = await User.retrieveById(userId);
    if(!_.isUndefined(hashedPassword)){
      user.password = hashedPassword;
      anyModified = true;
    }    
    if(!_.isUndefined(email)){
      user.email = email;
      anyModified = true;
    }
    if(!anyModified){
      reply(new Error('nothingModified'), null);
      return;
    }
    user.patch();
    reply(null, { "id": userId });
  } catch(e) {
    reply(new Error('userNotExist'), null);
  }
}