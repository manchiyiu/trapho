import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';
import { generateTokenMiddleware } from '../passport';

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  generateTokenMiddleware,
  async (req: any, res) => {
    res.json({ status: 'ok', user: req.user, token: req.token });
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    let { err } = await act({ role: 'auth', cmd: 'signup', username, password });
    if (err) {
      res.json({ err });
    } else {
      res.json({ status: 'ok' });
    }
  } catch (e) {
    res.json({ err: 'authError' });
  }
});

export default router;