import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';

const router = express.Router();

/**
 * @api {get} /photos/id/:photoId Retrieve photo by photoId
 * @apiName photos_photoId
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiParam {String} photoId                   photo id
 *
 * @apiSuccess {String} id                      photo id
 * @apiSuccess {String} userId                  user id of the uploader
 * @apiSuccess {String} locationId              location id where the photo is taken
 * @apiSuccess {String} timestamp               time when the photo is uploaded (ISO 8601 format)
 * @apiSuccess {String} url                     url path of the photo
 * @apiSuccess {String} description             description of the photo added by the user
 *
 ** @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "asdasd123123",
 *     "userId": "asdsad213fas",
 *     "locationId": "asd21jg34543",
 *     "timestamp": "2017-03-02T16:39:27+00:00",
 *     "url": "http://trapho.com/whatver/fsdfsdfsdf.jpg",
 *     "description": "Wow. This is amazing."
 *   }
 *
 * @apiError (Error 500) {String} apiError            Error message ('photoNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "photoNotExist"
 *   }
 *
 */

/**
 * @api {get} /photos/users/:userId Retrieve all photos of an user
 * @apiName photos_userId
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiParam {String} userId                    user id of the user
 *
 * @apiSuccess {Photo[]} photos                 array containing all related photos object
 *
 ** @apiSuccessExample  {json} Success-Response:
 *   {
 *     "photos": [{
 *        "id": "asdasd123123",
 *        "userId": "asdsad213fas",
 *        "timestamp": "2017-03-02T16:39:27+00:00",
 *        "locationId": "asd21jg34543",
 *        "url": "http://trapho.com/whatver/fsdfsdfsdf.jpg",
 *        "description": "Wow. This is amazing."
 *      }]
 *   }
 */

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
 * @apiSuccess {String} id                    id of the saved photo item
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "asdasd123123"
 *   }
 *
  * @apiError (Error 500) {String} apiError            Error message ('userNotExist', 'locationNotExist', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "userNotExist"
 *   }
 *
 */

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
 * @apiSuccess {String} id                    id of the updated photo item
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "asdasd123123"
 *   }
 *
 * @apiError (Error 500) {String} apiError            Error message ('photoNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "photoNotExist"
 *   }
 *
 */
/**
 * @api {delete} /photos/id/:photoId Delete a photo
 * @apiName photos_delete
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiParam {String} photoId                 photo id of the photo to be deleted
 *
 * @apiSuccess {String} id                    id of the deleted photo item
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "asdasd123123"
 *   }
 *
 * @apiError (Error 500) {String} apiError            Error message ('photoNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "photoNotExist"
 *   }
 *
 *
 */

 /**
 * @api {delete} /photos/upload Upload a photo to disk storage
 * @apiName photos_delete
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