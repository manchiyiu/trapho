import User from '../model';
import * as bcrypt from 'bcryptjs';

export default async (msg, reply) => {
  const { userId, password } = msg;
  let hashedPassword;
  try{
    hashedPassword = await bcrypt.hash(password, 10);
  } catch(e) {
    reply(new Error('passwordInvalid'));
  }
  
  try{
    const user: User = await User.retrieveById(userId);
    user.password = hashedPassword;
    user.patch();
    reply(null, { "id": userId });
  } catch(e) {
    reply(new Error('userNotExist'), null);
  }
}