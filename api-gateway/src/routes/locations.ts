import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';

const router = express.Router();

/**
 * @api {post} /locations/query Retrieve locations by query
 * @apiName location_retrieve_query
 * @apiPermission User
 * @apiGroup Locations
 *
 * @apiDescription If no query object is specified, the endpoint will return all the locations. Efficient search by rating is difficult to implement efficiently so skip for now.
 *
 * @apiParam {String}    [query={}]                Query object
 * @apiParam {String}    [query.range]             Search range
 * @apiParam {String}    [query.range.lat]         Latitude of the enter of the search circle
 * @apiParam {String}    [query.range.lng]         Longitude of the center of the search circle
 * @apiParam {String}    [query.range.radius]      Search radius of the circle (in meter)
 * @apiParam {String[]}  [query.tags]              Tags to search
 * @apiParam {String}    [query.name]              Name of the location
 *
 * @apiUse locationsArray
 */
router.post('/query', async (req, res) => {
  const { query } = req.body;
  try {
    const { locations } = await act({ role: 'location', cmd: 'locationRetrieve', query });
    res.json({ locations });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {get} /locations/id/:locationId Retrieve location by locationId
 * @apiName location_retrieve_locationId
 * @apiPermission User
 * @apiGroup Locations
 *
 * @apiParam {String} locationId      ID of the location
 *
 * @apiUse locations
 *
 * @apiError (Error 500) {String} apiError            Error message ('locationNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "locationNotExist"
 *   }
 */
router.get('/id/:locationId', async (req, res) => {
  const { locationId } = req.params;
  try {
    const {locations} = await act({ role: 'location', cmd: 'locationRetrieve', locationId });
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {post} /locations Create new location
 * @apiName location_create
 * @apiPermission User
 * @apiGroup Locations
 *
 * @apiParam {String} name              Name of the location
 * @apiParam {String} description       Description of the location
 * @apiParam {String[]} tags            Tags associated with the location (e.g. 'beach')
 * @apiParam {Object} coordinates       Coordinate of the location
 * @apiParam {Number} coordinates.lat   Latitude coordinate of the location
 * @apiParam {Number} coordinates.lng   Longitude coordinate of the location
 *
 * @apiUse objectId
 */
router.post('/', async (req, res) => {
  const { name, description, tags, coordinates } = req.body;
  try {
    const { id } = await act({ role: 'location', cmd: 'locationCreate', name, description, tags, coordinates });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {patch} /locations/id/:locationId Patch a location
 * @apiName location_patch
 * @apiPermission User
 * @apiGroup Locations
 *
 * @apiDescription If the param includes name only, then replace the name field in the current record and keep all the other fields.
 *
 * @apiParam {String} locationId          ID of the location
 * @apiParam {String} [name]              Name of the location
 * @apiParam {String} [description]       Description of the location
 * @apiParam {String[]} [tags]            Tags associated with the location (e.g. 'beach')
 * @apiParam {Object} [coordinates]       Coordinate of the location
 * @apiParam {Number} [coordinates.lat]   Latitude coordinate of the location
 * @apiParam {Number} [coordinates.lng]   Longitude coordinate of the location
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} apiError            Error message ('locationNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "locationNotExist"
 *   }
 */
router.patch('/id/:locationId', async (req, res) => {
  const { locationId } = req.params;
  const { name, description, tags, coordinates } = req.body;
  try {
    const { id } = await act({ role: 'location', cmd: 'locationPatch', locationId, name, description, tags, coordinates });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {delete} /locations/id/:locationId Delete a location
 * @apiName location_delete
 * @apiPermission User
 * @apiGroup Locations
 *
 * @apiParam {String} locationId          ID of the location
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} apiError            Error message ('locationNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "locationNotExist"
 *   }
 */
router.delete('/id/:locationId', async (req, res) => {
  const { locationId } = req.params;
  try {
    const { id } = await act({ role: 'location', cmd: 'locationDelete', locationId });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

export default router;