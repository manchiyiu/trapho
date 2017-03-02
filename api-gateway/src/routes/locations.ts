import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';

const router = express.Router();

/**
 * @api {get} /locations/:locationId Retrieve locations
 * @apiName location_get
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
 * @apiSuccess {Location[]} locations               Array containing all matching locations, empty array if no match. For detailed strucuture, please refer to "Retrieve location by id".
 *
 ** @apiSuccessExample  {json} Success-Response:
 *   { "locations":
 *      [{
 *        "id": "1234567",
 *        "name": "Small Bridge Flowing Water",
 *        "description": "Some fun place.",
 *        "tags": ["CUHK", "fun"],
 *        "coordinates": {
 *          "lat": 23.02323,
 *          "lng": -23.323223
 *        },
 *        "rating": 7.8,
 *        "photoIds": ["dasddasd", "asd23ewaasd"]
 *      }]
 *  }
 *
 */
router.get('/', async (req, res) => {
});


/**
 * @api {get} /locations/:locationId Retrieve location by id
 * @apiName location_get_id
 * @apiPermission User
 * @apiGroup Locations
 *
 * @apiSuccess {String} id                ID of the location
 * @apiSuccess {String} name              Name of the location
 * @apiSuccess {String} description       Description of the location
 * @apiSuccess {String[]} tags            Tags associated with the location (e.g. 'beach')
 * @apiSuccess {Object} coordinates       Coordinate of the location
 * @apiSuccess {Number} coordinates.lat   Latitude coordinate of the location
 * @apiSuccess {Number} coordinates.lng   Longitude coordinate of the location
 * @apiSuccess {Number} rating            Rating of the location, which is calcuated using Rating table.
 * @apiSuccess {String[]} photoIds        IDs of all the photos taken at the location
 *
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "1234567",
 *     "name": "Small Bridge Flowing Water",
 *     "description": "Some fun place.",
 *     "tags": ["CUHK", "fun"],
 *     "coordinates": {
 *       "lat": 23.02323,
 *       "lng": -23.323223
 *     },
 *     "rating": 7.8,
 *     "photoIds": ["dasddasd", "asd23ewaasd"]
 *   }
 *
 * @apiError (Error 500) {String} apiError            Error message ('locationNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "locationNotExist"
 *   }
 */
router.get('/:locationId', async (req, res) => {
  const { locationId } = req.params;
  res.json({ status: 'ok' });
});

/**
 * @api {post} /locations/ Add new location
 * @apiName location_add
 * @apiPermission User
 * @apiGroup Locations
 *
 * @apiParam {String} name              Name of the location
 * @apiParam {String} description       Description of the location
 * @apiParam {String[]} tags            Tags associated with the location (e.g. 'beach')
 * @apiParam {Object} coordinates       Coordinate of the location
 * @apiParam {Number} coordinates.lat   Latitude coordinate of the location
 * @apiParam {Number} coordinates.lng   Longitude coordinate of the location
 * @apiParam {String[]} photoIds        IDs of all the photos taken at the location
 *
 * @apiSuccess {String} id              ID of the newly created object
 *
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "1234567"
 *   }
 *
 */
router.post('/', async (req, res) => {
});

/**
 * @api {patch} /locations/:locationId Patch a location
 * @apiName location_patch
 * @apiPermission User
 * @apiGroup Locations
 *
 * @apiDescription If the param includes name only, then replace the name field in the current record and keep all the other fields.
 *
 * @apiParam {String} [name]              Name of the location
 * @apiParam {String} [description]       Description of the location
 * @apiParam {String[]} [tags]            Tags associated with the location (e.g. 'beach')
 * @apiParam {Object} [coordinates]       Coordinate of the location
 * @apiParam {Number} coordinates.lat   Latitude coordinate of the location
 * @apiParam {Number} coordinates.lng   Longitude coordinate of the location
 * @apiParam {String[]} [photoIds]        IDs of all the photos taken at the location
 *
 * @apiSuccess {String} id              ID of the newly created object
 *
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "1234567"
 *   }
 *
 */
router.patch('/:locationId', async (req, res) => {
});

/**
 * @api {delete} /locations/:locationId Delete a location
 * @apiName location_delete
 * @apiPermission User
 * @apiGroup Locations
 *
 * @apiDescription This endpoint is probably just for debugging purposes.
 *
 * @apiParam {String} id                ID of the location
 *
 * @apiSuccess {String} id              ID of the delected object
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "1234567"
 *   }
 *
 */


export default router;