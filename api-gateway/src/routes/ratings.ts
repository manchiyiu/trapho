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
  try {
    const { ratings } = await act({ role: 'location', cmd: 'ratingRetrieve', userId });
    res.json({ ratings });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {get} /ratings/users/:userId/locations/:locationId Retrieve average rating locationId
 * @apiName 
 * @apiPermission User
 * @apiGroup Locations Ratings
 *
 * @apiParam {String} locationId               Location id
 *
 * @apiUse ratings
 *
 * @apiError (Error 500) {String} error Possible value: 'locationNotExist', etc.
 * @apiErrorExample {json} Error-Response:
 *    {
 *      "error": "ratingNotExist"
 *    }
 */
router.get('/locations/:locationId', async (req, res) => {
  const { locationId } = req.params;
  try {
    const { rating } = await act({ role: 'location', cmd: 'ratingRetrieve', locationId });
    res.json(rating); // there should be only one result
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
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
router.get('/users/:userId/locations/:locationId/photos/:photoId', async (req, res) => {
  const { userId, locationId, photoId } = req.params;
  try {
    const { ratings } = await act({ role: 'location', cmd: 'ratingRetrieve', userId, locationId, photoId });
    res.json(ratings[0]); // there should be only one result
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
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
router.patch('/users/:userId/locations/:locationId/photos/:photoId', async (req, res) => {
  const { userId, locationId, photoId } = req.params;
  const { rating } = req.body;
  try {
    const { id } = await act({ role: 'location', cmd: 'ratingPatch', userId, locationId, photoId, rating });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
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
router.delete('/users/:userId/locations/:locationId/photos/:photoId', async (req, res) => {
  const { userId, locationId, photoId } = req.params;
  try {
    const { id } = await act({ role: 'location', cmd: 'ratingDelete', userId, locationId, photoId });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
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
  const { userId, locationId, rating, photoId } = req.body;
  try {
    const { id } = await act({ role: 'location', cmd: 'ratingCreate', userId, locationId, rating, photoId });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

export default router;