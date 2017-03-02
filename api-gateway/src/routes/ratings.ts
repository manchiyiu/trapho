import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';

const router = express.Router();

/**
 * @api {get} /ratings/:userId Retrieve ratings by userId
 * @apiName ratings_userid
 * @apiPermission User
 * @apiGroup Locations Ratings
 *
 * @apiDescription Retrieve all ratings added by the user with that userId.
 *
 * @apiParam {String} userId                   User id
 *
 * @apiSuccess {Ratings[]} ratings             Array containing all ratings object
 * @apiSuccess {String} ratings.locationId     Location ID of the location associated with that rating
 * @apiSuccess {Number} ratings.rating         Rating value ([0, 10])
 *
 ** @apiSuccessExample  {json} Success-Response:
 *   {
 *     "ratings": [{
 *        "locationId": "1234567",
 *        "rating": 5.8
 *      },
 *      {
 *        "locationId": "2135sadas",
 *        "rating": 6.89
 *      }]
 *   }
 */

/**
 * @api {get} /ratings/:userId/:locationId Retrieve ratings by userId and locationId
 * @apiName ratings_userid_locationid
 * @apiPermission User
 * @apiGroup Locations Ratings
 *
 * @apiParam {String} userId                   User id
 * @apiParam {String} locationId               Location id
 *
 * @apiSuccess {String} locationId     Location ID of the location associated with that rating
 * @apiSuccess {Number} rating         Rating value ([0, 10])
 *
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "locationId": "1234567",
 *     "rating": 5.8
 *   }
 *
 * @apiError (Error 500) {String} error Possible value: 'ratingNotExist', etc.
 * @apiErrorExample {json} Error-Response:
 *    {
 *      "error": "ratingNotExist"
 *    }
 */

/**
 * @api {patch} /ratings/:userId/:locationId Patch ratings by userId and locationId
 * @apiName ratings_patch_userid_locationid
 * @apiPermission User
 * @apiGroup Locations Ratings
 *
 * @apiDescription Patch a rating object.
 *
 * @apiParam {String} userId                  User id
 * @apiParam {String} locationId              Location id
 * @apiParam {String} rating                  New rating value
 *
 * @apiSuccess {String} id                    ID of the rating record
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "1234567",
 *   }
 *
 * @apiError (Error 500) {String} error Possible value: 'ratingNotExist', etc.
 * @apiErrorExample {json} Error-Response:
 *    {
 *      "error": "ratingNotExist"
 *    }
 */

/**
 * @api {delete} /ratings/:userId/:locationId Delete ratings by userId and locationId
 * @apiName ratings_delete_userid_locationid
 * @apiPermission User
 * @apiGroup Locations Ratings
 *
 * @apiDescription Delete a rating object.
 *
 * @apiParam {String} userId                  User id
 * @apiParam {String} locationId              Location id
 *
 * @apiSuccess {String} id                    ID of the rating record deleted
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "1234567",
 *   }
 *
 * @apiError (Error 500) {String} error Possible value: 'ratingNotExist', etc.
 * @apiErrorExample {json} Error-Response:
 *    {
 *      "error": "ratingNotExist"
 *    }
 */

/**
 * @api {delete} /ratings/:userId/:locationId Create ratings by userId and locationId
 * @apiName ratings_create_userid_locationid
 * @apiPermission User
 * @apiGroup Locations Ratings
 *
 * @apiDescription Creates a rating object.
 *
 * @apiParam {String} userId                  User id
 * @apiParam {String} locationId              Location id
 * @apiParam {String} rating                  Rating value
 *
 * @apiSuccess {String} id                    ID of the rating record added
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "1234567",
 *   }
 *
 * @apiError (Error 500) {String} error Possible value: 'userNotExist', 'locationNotExist', etc.
 * @apiErrorExample {json} Error-Response:
 *    {
 *      "error": "userNotExist"
 *    }
 */

export default router;