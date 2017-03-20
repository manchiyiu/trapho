import User from '../model';

export default async (msg, reply) => {
  const { userId } = msg;

  // validate userId first
  try{
    await User.retrieveById(userId);
  } catch(e) {
    // user not exist
    reply(e, null);
    return;
  }

  try{
    await User.remove(userId);
    reply(null, { id: userId });
  } catch(e) {
    reply(new Error('databaseError'), null);
  }
}