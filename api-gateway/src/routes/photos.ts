import * as Bluebird from 'bluebird';

import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import * as _ from 'lodash';
import { v1 as uuid } from 'uuid';
import * as Vision from '@google-cloud/vision';

import { act } from '../utils';

const router = express.Router();
const vision = Vision({
  projectId: process.env.GOOGLE_PROJECTID,
  keyFilename: 'key.json'
});

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
  try {
    const {photos} = await act({ role: 'photo', cmd: 'photoRetrieve', photoId });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {get} /photos/locations/:photoId Retrieve photos associated with a location
 * @apiName photos_retrieve_locationId
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiParam {String} locationId                   location id
 *
 * @apiUse photosArray
 *
 * @apiError (Error 500) {String} apiError            Error message ('locationNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "locationNotExist"
 *   }
 */
router.get('/locations/:locationId', async (req, res) => {
  const { locationId } = req.params;
  try {
    const { photos } = await act({ role: 'photo', cmd: 'photoRetrieve', locationId });
    res.json({ photos });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
})

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
  try {
    const { photos } = await act({ role: 'photo', cmd: 'photoRetrieve', userId });
    res.json({ photos });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {post} /photos Create new photo
 * @apiName photos_create
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiDescription This part does not contain photo upload logic, they will be handled seperately.
 *
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
  const { locationId, url, description } = req.body;
  const userId = req.user.id;
  try {
    const { id } = await act({ role: 'photo', cmd: 'photoCreate', userId, locationId, url, description });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
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
  try {
    const { id } = await act({ role: 'photo', cmd: 'photoPatch', photoId, userId, locationId, url, description });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
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
  try {
    const { id } = await act({ role: 'photo', cmd: 'photoDelete', photoId });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

 /**
 * @api {post} /photos/upload Upload a photo to disk storage
 * @apiName photos_upload
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiDescription Isaac will implement this.
 *
 * @apiParam {File} file                      the file object
 *
 * @apiSuccess {String} url                   url path of the uploaded file
 * @apiSuccess {String} tags                  tags provided by the Google Vision API
 * @apiSuccess {String} landmarks             landmarks detected by Google Vision API
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "url": "sf1412ffsdfasdase1123.jpg",
 *     "tags": ["text", "fun", "funny", "warren"],
 *     "landmarks": ["Eiffel Tower"]
 *   }
 *
 * @apiError (Error 500) {String} apiError            Error message ('noFileUploaded', 'fileFormatInvalid', 'uploadFailed' etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "noFileUploaded"
 *   }
 */
router.post('/upload', async (req: any, res) => {

  if (!req.files) {
    return res.status(500).json({ error: 'noFileUploaded' });
  }

  const { files: file } = req.files;

  if (path.extname(file.name) !== '.jpg' && path.extname(file.name) !== '.png' && path.extname(file.name) !== '.jpeg') {
    return res.status(500).json({ error: 'fileFormatInvalid' });
  }

  const filename = `${uuid()}${path.extname(file.name)}`;
  const uploadPath = `/data/photos/${filename}`;

  const move = uploadPath => new Promise((resolve, reject) => {
    file.mv(uploadPath, err => {
      if (err) { reject(err); }
      resolve();
    });
  });

  try {
    await move(uploadPath);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'uploadFailed' });
  }

  let tags, landmarks;
  try {
    [tags] = await vision.detectLabels(uploadPath);
    [landmarks] = await vision.detectLandmarks(uploadPath);
  } catch (e) {
    console.error(e);
    return res.status(200).json({ url: filename });
  }

  return res.status(200).json({ url: filename, tags, landmarks });
});


/**
 * @api {get} /photos Retrieve all photos
 * @apiName photos_retrieve_all
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiUse photosArray
 *
 * @apiError (Error 500) {String} apiError            Error message ('userNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "databaseError"
 *   }
 */
router.get('/', async (req: any, res) => {
  try {
    const { photos } = await act({ role: 'photo', cmd: 'photoRetrieveAll'});
    res.json({ photos });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});


/**
 * @api {get} /stream Retrieve photo stream
 * @apiName photos_stream_retrieve
 * @apiPermission User
 * @apiGroup Photos
 *
 * @apiParam {Number} [count]                   no. of photos per batch
 * @apiParam {Number} [skip]                    batch number
 * @apiParam {string} [userId]                  keywords for username (seperated by comma)
 * @apiParam {string} [username]                keywords for username (seperated by comma)
 * @apiParam {String} [locationName]            keywords for location name (seperated by comma)
 * @apiParam {String} [tags]                    keywords for tags (seperated by comma)
 * @apiParam {String} [timestamp]               time of the photo created
 *
 * @apiSuccessExample  {json} Success-Response:
 * {
 *  "photos": [
 *   {
 *     "id": "58d5b5953bf68e000f54e63e",
 *     "timestamp": "2017-03-25T00:11:01.207Z",
 *     "url": "{{id-placeholder}}",
 *     "userId": "{{id-placeholder}}",
 *     "username": "clark",
 *     "locationName": "The Peak Tram",
 *     "likesCount": 0,
 *     "comments": [
 *      {
 *        "id": "{{id-placeholder}}",
 *        "userId": "{{id-placeholder}}",
 *        "timestamp": "2017-03-02T16:39:27+00:00",
 *        "content": "wow. first!"
 *      },
 *      {
 *        "id": "{{id-placeholder}}",
 *        "userId": "{{id-placeholder}}",
 *        "timestamp": "2017-03-02T16:40:27+00:00",
 *        "content": "wow. second!"
 *      }
 *     ]
 *   }
 *  ]
 * }
 * @apiError (Error 500) {String} apiError            Error message ('databaseError')
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "databaseError"
 *   }
 */
router.get('/stream', async (req: any, res) => {
  try {
    const { userId, username, locationName, tags, timestamp, count, skip } = req.query;
    const { photos } = await act({ role: 'photo', cmd: 'photoStreamRetrieve', userId, username, locationName, tags, timestamp, count, skip });
    res.json({ photos });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

router.post('/createTest', async (req, res) => {
  const { locationQuery, url, description, userId } = req.body;
  try {
    const { id } = await act({ role: 'photo', cmd: 'photoCreateTest', userId, locationQuery, url, description });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

export default router;