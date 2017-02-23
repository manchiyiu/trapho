import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';
import { generateTokenMiddleware } from '../passport';

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false, failWithError: true }),
  generateTokenMiddleware,
  async (req: any, res) => {
    res.json({ status: 'ok', user: req.user, token: req.token });
});

router.post('/signup', async (req, res) => {
});

export default router;