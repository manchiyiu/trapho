import * as express from 'express';

import { act } from '../utils';

const router = express.Router();

router.post('/login', async (req, res) => {

  console.log(req.body);
  res.json({ thanks: 'you' });

});

export default router;