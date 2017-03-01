import * as express from 'express';
import { act } from '../utils';

const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, coordinates, description } = req.body;
  try {
    let msg = await act({ role: 'location', cmd: 'add', name, coordinates, description });
    res.json({ status: 'ok', result: msg.result });
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
    let msg = await act({ role: 'location', cmd: 'search', id, name, coordinates, description });
    res.json({ status: 'ok' , result:msg.result});
  } catch (err) {
    res.json({ status: 'error', error: err.details.message });
  }
})

router.post('/rate', async(req,res) => {
  const {id, rating, photoID} = req.body;
  try {
    let msg = await act({ role: 'location', cmd: 'rate', id, rating, photoID });
    res.json({ status: 'ok' , rating:msg.rating, personRated: msg.personRated});
  } catch (err) {
    res.json({ status: 'error', error: err.details.message });
  }
})

router.post('/unrate', async(req,res) => {
  const {id, photoID} = req.body;
  try {
    let msg = await act({ role: 'location', cmd: 'unrate', id, photoID });
    res.json({ status: 'ok' , rating:msg.rating, personRated: msg.personRated});
  } catch (err) {
    res.json({ status: 'error', error: err.details.message });
  }
})
export default router;