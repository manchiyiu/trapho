import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';

const router = express.Router();

/**
 * @api {get} /test Test backend connection
 * @apiName Test
 * @apiPermission User
 * @apiGroup Test
 *
 * @apiSuccess {String} status Status, only having an 'ok' value.
 */
router.get('/', async (req, res) => {
  try {
    await act({ role: 'activity', cmd: 'test' });
    await act({ role: 'auth', cmd: 'test' })
    await act({ role: 'location', cmd: 'test' })
    await act({ role: 'photo', cmd: 'test' })
    await act({ role: 'timeline', cmd: 'test' })
    res.json({ status: 'ok' });
  } catch (e) {
    res.json({ status: 'error' });
  }
});

export default router;