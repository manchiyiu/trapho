import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as jwt from 'jsonwebtoken';

import { act, SERVER_SECRET } from './utils';

passport.use(new LocalStrategy(
  async (username, password, cb) => {
    try {
      const user = await act({ role: 'auth', cmd: 'userLogin', username, password });
      return cb(null, user);
    } catch (err) {
      return cb(err, null);
    }
  }
));

export const generateTokenMiddleware = function (req, res, next) {
  req.token = jwt.sign({
    id: req.user.id
  }, SERVER_SECRET, { expiresIn: '2h' });
  next();
};