import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { act } from './utils';

passport.use(new LocalStrategy(
  async (username, password, cb) => {
    try {
      const result = await act({ role: 'auth', cmd: 'login', username, password });
      return cb(null, result);
    } catch (e) {
      return cb(e, null);
    }
  }
));

passport.serializeUser((user: any, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (userId: string, cb) => {
  try {
    const user = await act({ role: 'auth', cmd: 'deserialize', userId });
    cb(null, user);
  } catch (e) {
    cb(e, null);
  }
});
