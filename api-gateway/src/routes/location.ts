import * as express from 'express';
import { act } from '../utils';

const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, coordinates, description } = req.body;
  try {
    let locationID = await act({ role: 'location', cmd: 'add', name, coordinates, description });
    res.json({ status: 'ok', id: locationID });
  } catch (err) {
    res.json({ status: 'error', error: err.details.message });
  }
});

router.post('/modify', async (req, res) => {
  const { id, name, coordinates, description } = req.body;
  try {
    await act({ role: 'location', cmd: 'modify', id, name, coordinates, description });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: err.details.message });
  }
})

router.post('/search', async(req,res) => {
  const {id, name, coordinates, description} = req.body;
  try {
    let searchResult = await act({ role: 'location', cmd: 'search', id, name, coordinates, description });
    res.json({ status: 'ok' , result:searchResult});
  } catch (err) {
    res.json({ status: 'error', error: err.details.message });
  }
})
export default router;