import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';

const router = express.Router();

/**
 * @api {get} /ratings/users/:userId Retrieve all ratings by userId
 * @apiName ratings_retrieve_userid
 * @apiPermission User
 * @apiGroup Locations Ratings
 *
 * @apiDescription Retrieve all ratings added by the user with that userId.
 *
 * @apiParam {String} userId                   User id
 *
 * @apiUse ratingsArray
 *
 * @apiError (Error 500) {String} apiError Error message ('userNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "userNotExist"
 *   }
 */
router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  res.json({ 'status': 'not_implemented_yet' });
});

/**
 * @api {get} /ratings/users/:userId/locations/:locationId Retrieve ratings by userId and locationId
 * @apiName ratings_retrieve_userid_locationId
 * @apiPermission User
 * @apiGroup Locations Ratings
 *
 * @apiParam {String} userId                   User id
 * @apiParam {String} locationId               Location id
 *
 * @apiUse ratings
 *
 * @apiError (Error 500) {String} error Possible value: 'userNotExist', 'locationNotExist', 'ratingNotExist', etc.
 * @apiErrorExample {json} Error-Response:
 *    {
 *      "error": "ratingNotExist"
 *    }
 */
router.get('/users/:userId/locations/:locationId', async (req, res) => {
  const { userId, locationId } = req.params;
  res.json({ 'status': 'not_implemented_yet' });
});

/**
 * @api {patch} /ratings/users/:userId/locations/:locationId Patch ratings by userId and locationId
 * @apiName ratings_patch_userid_locationid
 * @apiPermission User
 * @apiGroup Locations Ratings
 *
 * @apiParam {String} userId                  User id
 * @apiParam {String} locationId              Location id
 * @apiParam {String} rating                  New rating value
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} error Possible value: 'userNotExist', 'locationNotExist', 'ratingNotExist', etc.
 * @apiErrorExample {json} Error-Response:
 *    {
 *      "error": "ratingNotExist"
 *    }
 */
router.patch('/users/:userId/locations/:locationId', async (req, res) => {
  const { userId, locationId } = req.params;
  const { rating } = req.body;
  res.json({ 'status': 'not_implemented_yet' });
});

/**
 * @api {delete} /ratings/users/:userId/locations/:locationId Delete ratings by userId and locationId
 * @apiName ratings_delete_userid_locationid
 * @apiPermission User
 * @apiGroup Locations Ratings
 *
 * @apiParam {String} userId                  User id
 * @apiParam {String} locationId              Location id
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} error Possible value: 'userNotExist', 'locationNotExist', 'ratingNotExist', etc.
 * @apiErrorExample {json} Error-Response:
 *    {
 *      "error": "ratingNotExist"
 *    }
 */
router.delete('/users/:userId/locations/:locationId', async (req, res) => {
  const { userId, locationId } = req.params;
  res.json({ 'status': 'not_implemented_yet' });
});

/**
 * @api {post} /ratings Create ratings
 * @apiName ratings_create
 * @apiPermission User
 * @apiGroup Locations Ratings
 *
 * @apiDescription Creates a rating object.
 *
 * @apiParam {String} userId                  User id
 * @apiParam {String} locationId              Location id
 * @apiParam {String} rating                  Rating value
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} error Possible value: 'userNotExist', 'locationNotExist', etc.
 * @apiErrorExample {json} Error-Response:
 *    {
 *      "error": "locationNotExist"
 *    }
 */
router.post('/', async (req, res) => {
  const { userId, locationId, rating } = req.params;
  res.json({ 'status': 'not_implemented_yet' });
});

export default router;