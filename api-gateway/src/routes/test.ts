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
    let auth = await act({ role: 'auth', cmd: 'test' });
    let location = await act({ role: 'location', cmd: 'test' });
    let photo = await act({ role: 'photo', cmd: 'test' });
    let timeline = await act({ role: 'timeline', cmd: 'test' });
    let activity = await act({ role: 'activity', cmd: 'test' });

    res.json({ activity, auth, location, photo, timeline });

  } catch (e) {
    res.json({ status: 'error' });
  }
});

export default router;