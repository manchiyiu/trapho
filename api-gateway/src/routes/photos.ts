import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';

const router = express.Router();

/**
 * @api {get} /photos/id/:photoId Retrieve photo by photoId
 * @apiName photos_retrieve_photoId
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiParam {String} photoId                   photo id
 *
 * @apiUse photos
 *
 * @apiError (Error 500) {String} apiError            Error message ('photoNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "photoNotExist"
 *   }
 */
router.get('/id/:photoId', async (req, res) => {
  const { photoId } = req.params;
  res.json({ 'status': 'not_implemented_yet' });
});

/**
 * @api {get} /photos/users/:userId Retrieve all photos of an user
 * @apiName photos_retrieve_userId
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiParam {String} userId                    user id of the user
 *
 * @apiUse photosArray
 *
 * @apiError (Error 500) {String} apiError            Error message ('userNotExist', 'databaseError', etc.)
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
 * @api {post} /photos Create new photo
 * @apiName photos_create
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiDescription This part does not contain photo upload logic, they will be handled seperately.
 *
 * @apiParam {String} userId                  user id of the uploader
 * @apiParam {String} locationId              location id where the photo is taken
 * @apiParam {String} url                     url path of the photo
 * @apiParam {String} description             description of the photo added by the user
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} apiError            Error message ('userNotExist', 'locationNotExist', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "userNotExist"
 *   }
 *
 */
router.post('/', async (req, res) => {
  const { userId, locationId, url, description } = req.body;
  res.json({ 'status': 'not_implemented_yet' });
});

/**
 * @api {patch} /photos/id/:photoId Patch a photo
 * @apiName photos_patch
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiDescription PATCH api will update part of the existing object
 *
 * @apiParam {String} photoId                   photo id of the photo to be modified
 * @apiParam {String} [userId]                  user id of the uploader
 * @apiParam {String} [locationId]              location id where the photo is taken
 * @apiParam {String} [url]                     url path of the photo
 * @apiParam {String} [description]             description of the photo added by the user
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} apiError            Error message ('photoNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "photoNotExist"
 *   }
 */
router.patch('/id/:photoId', async (req, res) => {
  const { photoId } = req.params;
  const { userId, locationId, url, description } = req.body;
  res.json({ 'status': 'not_implemented_yet' });
});

/**
 * @api {delete} /photos/id/:photoId Delete a photo
 * @apiName photos_delete
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiParam {String} photoId                 photo id of the photo to be deleted
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} apiError            Error message ('photoNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "photoNotExist"
 *   }
 */
router.delete('/id/:photoId', async (req, res) => {
  const { photoId } = req.params;
  res.json({ 'status': 'not_implemented_yet' });
});

 /**
 * @api {delete} /photos/upload Upload a photo to disk storage
 * @apiName photos_upload
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiDescription Isaac will implement this.
 *
 * @apiParam {Files[]} files                  array representing files to be uploaded
 *
 * @apiSuccess {String} url                   url path of the uploaded file
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "url": "http://www.trapho.com/static/sf1412ffsdfasdase1123.jpg"
 *   }
 *
 */
router.post('/upload', async (req, res) => {
  /* Isaac will write this */
});

export default router;