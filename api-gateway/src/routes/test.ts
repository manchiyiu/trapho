import * as express from 'express';

import { act } from '../utils';

const router = express.Router();

router.get('/', async (req, res) => {

  console.log('--- testing ---\n\n');

  let result;

  try {
    let result = await act({role: 'location', cmd: 'sum', left: 1, right: 2});
    console.log('location', result);

    result = await act({role: 'timeline', cmd: 'sum', left: 1, right: 2});
    console.log('timeline', result);

    result = await act({role: 'auth', cmd: 'sum', left: 1, right: 2});
    console.log('auth', result);

    result = await act({role: 'storage', cmd: 'sum', left: 1, right: 2});
    console.log('storage', result);

    result = await act({role: 'activity', cmd: 'sum', left: 1, right: 2});
    console.log('activity', result);

    console.log('\n--------');
  } catch (e) {
    console.error(e);
  }
});

export default router;