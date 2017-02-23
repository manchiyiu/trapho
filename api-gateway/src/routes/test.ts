import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ status: 'ok' });
});

export default router;