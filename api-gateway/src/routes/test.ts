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
 *
 * @apiSuccess {String} status Status, only having an 'ok' value.
 */
router.get('/', async (req, res) => {
  res.json({ status: 'ok' });
});

export default router;