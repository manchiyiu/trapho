import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';
import { generateTokenMiddleware } from '../passport';

const router = express.Router();

/**
 * @api {get} /likes/photos/:photoId Retrieve all likes by photoId
 * @apiName likes_retrieve_photoId
 * @apiPermission User
 * @apiGroup Likes
 *
 * @apiParam {String}       photoId                   ID of the photo
 *
 * @apiUse likesArray
 *
 * @apiError (Error 500) {String} apiError            Error message ('photoNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "photoNotExist"
 *   }
 */
router.get('/photos/:photoId', async (req, res) => {
  const { photoId } = req.params;
  res.json({ 'status': 'not_implemented_yet' });
});

/**
 * @api {get} /likes/users/:userId Retrieve all likes by userId
 * @apiName likes_retrieve_userId
 * @apiPermission User
 * @apiGroup Likes
 *
 * @apiParam {String}       userId                  ID of the user
 *
 * @apiUse likesArray
 *
 * @apiError (Error 500) {String} apiError          Error message ('userNotExist', 'databaseError', etc.)
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
 * @api {get} /likes/users/:userId/photos/:photoId Retrieve like status by userId and photoId
 * @apiName likes_status
 * @apiPermission User
 * @apiGroup Likes
 *
 * @apiParam {String}       userId                 ID of the user
 * @apiParam {String}       photoId                ID of the photo
 *
 * @apiParam {boolean}      liked                  Whether user liked the photo or not
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "liked": true
 *   }
 *
 * @apiError (Error 500) {String} apiError          Error message ('userNotExist', 'photoNotExist', 'likeNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "likeNotExist"
 *   }
 */
router.get('/users/:userId/photos/:photoId', async (req, res) => {
  const { userId, photoId } = req.params;
  res.json({ 'status': 'not_implemented_yet' });
});

/**
 * @api {post} /likes Create new like
 * @apiName likes_create
 * @apiPermission User
 * @apiGroup Likes
 *
 * @apiParam {String}       userId                  ID of the user
 * @apiParam {String}       photoId                 ID of the photo
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} apiError          Error message ('alreadyExist', 'userNotExist', 'photoNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "userNotExist"
 *   }
 */
router.post('/', async (req, res) => {
  const { userId, photoId } = req.body;
  res.json({ 'status': 'not_implemented_yet' });
});

/**
 * @api {delete} /likes Delete like by userId and photoId
 * @apiName likes_delete_userId_photoId
 * @apiPermission User
 * @apiGroup Likes
 *
 * @apiParam {String}       userId                  ID of the user
 * @apiParam {String}       photoId                 ID of the photo
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} apiError          Error message ('userNotExist', 'photoNotExist', 'likeNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "likeNotExist"
 *   }
 */
router.delete('/', async (req, res) => {
  const { userId, photoId } = req.body;
  res.json({ 'status': 'not_implemented_yet' });
});

export default router;