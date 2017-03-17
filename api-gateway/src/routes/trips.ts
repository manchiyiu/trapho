import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';

const router = express.Router();

/**
 * @api {get} /trips/users/:userId Retrieve all trips by userId
 * @apiName trips_userId
 * @apiPermission User
 * @apiGroup Trips
 *
 * @apiParam {String}       userId                 ID of the user
 *
 * @apiUse tripsArray
 *
 * @apiError (Error 500) {String} apiError            Error message ('userNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "userNotExist"
 *   }
 */
router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const { trips } = await act({ role: 'activity', cmd: 'tripRetrieve', userId });
    res.json({ trips });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {get} /trips/id/:tripId Retrieve trip by tripId
 * @apiName trips_id
 * @apiPermission User
 * @apiGroup Trips
 *
 * @apiParam {String}       tripID                 ID of the trip
 *
 * @apiUse trips
 *
 * @apiError (Error 500) {String} apiError            Error message ('tripNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "tripNotExist"
 *   }
 */
router.get('/id/:tripId', async (req, res) => {
  const { tripId } = req.params;
  try {
    const { trips } = await act({ role: 'activity', cmd: 'tripRetrieve', tripId });
    res.json(trips[0]); // there should be only one result
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {post} /trips/ Create a trip
 * @apiName trips_create
 * @apiPermission User
 * @apiGroup Trips
 *
 * @apiParam {String}     name                   Name of the trip
 * @apiParam {String}     userId                 ID of the user who created the trip
 * @apiParam {String}     timestamp              Timestamp when the trip is created
 * @apiParam {Object[]}   locations              See below for object structure
 * @apiParam {String}     locations.id           ID of the locationId
 * @apiParam {String}     locations.startTime    Timestamp when the location visit starts
 * @apiParam {String}     locations.endTime      Timestamp when the location visit ends
 * @apiParam {String}     [locations.comment]    Custom user comments on the location
 *
 * @apiUse objectId
 * @apiError (Error 500) {String} error Possible value: 'userNotExist', etc.
 * @apiErrorExample {json} Error-Response:
 *    {
 *      "error": "ratingNotExist"
 *    }
 */
router.post('/', async (req, res) => {
  const { name, userId, timestamp, locations } = req.body;
  try {
    const { id } = await act({ role: 'activity', cmd: 'tripCreate', name, userId, timestamp, locations });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {patch} /trips/id/:tripId Patch a trip
 * @apiName trips_patch
 * @apiPermission User
 * @apiGroup Trips
 *
 * @apiParam {String}     tripId                 ID of the trip to be patched
 * @apiParam {String}     name                   Name of the trip
 * @apiParam {String}     userId                 ID of the user who created the trip
 * @apiParam {String}     timestamp              Timestamp when the trip is created
 * @apiParam {Object[]}   locations              See below for object structure
 * @apiParam {String}     locations.id           ID of the locationId
 * @apiParam {String}     locations.startTime    Timestamp when the location visit starts
 * @apiParam {String}     locations.endTime      Timestamp when the location visit ends
 * @apiParam {String}     [locations.comment]    Custom user comments on the location
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} apiError       Error message ('tripNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "tripNotExist"
 *   }
 */
router.patch('/id/:tripId', async (req, res) => {
  const { tripId } = req.params;
  const { name, userId, timestamp, locations } = req.body;
  try {
    const { id } = await act({ role: 'activity', cmd: 'tripPatch', tripId, name, userId, timestamp, locations });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {delete} /trips/id/:tripId Delete a trip
 * @apiName trips_delete
 * @apiPermission User
 * @apiGroup Trips
 *
 * @apiParam {String}     tripId                 ID of the trip to be patched
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} apiError       Error message ('tripNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "tripNotExist"
 *   }
 */
router.delete('/id/:tripId', async (req, res) => {
  const { tripId } = req.params;
  try {
    const { id } = await act({ role: 'activity', cmd: 'tripDelete', tripId });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

export default router;