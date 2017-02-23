import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as jwt from 'jsonwebtoken';

import { act, SERVER_SECRET } from './utils';

passport.use(new LocalStrategy(
  async (username, password, cb) => {
    try {
      const { err, user } = await act({ role: 'auth', cmd: 'login', username, password });
      if (err) {
        return cb(err, null);
      }
      return cb(null, user);
    } catch (e) {
      return cb(e, null);
    }
  }
));

// passport.deserializeUser(async (userId: string, cb) => {
//   try {
//     const user = await act({ role: 'auth', cmd: 'deserialize', userId });
//     cb(null, user);
//   } catch (e) {
//     cb(e, null);
//   }
// });

export const generateTokenMiddleware = function (req, res, next) {
  req.token = jwt.sign({ id: req.user._id }, SERVER_SECRET, { expiresIn: '2h' });
  next();
};