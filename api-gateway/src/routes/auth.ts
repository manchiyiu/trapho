import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';

const router = express.Router();

router.post('/login', passport.authenticate('local'), async (req, res) => {
  res.json({ thanks: 'you' });
});

export default router;