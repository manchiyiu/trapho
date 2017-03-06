import * as express from 'express';
import * as passport from 'passport';

import { act } from '../utils';
import { generateTokenMiddleware } from '../passport';

const router = express.Router();

/**
 * @api {get} /comments/photos/:photoId Retrieve all comments by photoId
 * @apiName comments_retrieve_photoId
 * @apiPermission User
 * @apiGroup Comments
 *
 * @apiParam {String} photoId ID of the photo
 *
 * @apiUse commentsArray
 *
 * @apiError (Error 500) {String} apiError Error message ('photoNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "photoNotExist"
 *   }
 */
router.get('/photos/:photoId', async (req, res) => {
  const { photoId } = req.params;
  try {
    const { comments } = await act({ act: 'timeline', cmd: 'commentRetrive', photoId });
    res.json({ comments });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {get} /comments/users/:userId Retrieve all comments by userId
 * @apiName comments_retrieve_userId
 * @apiPermission User
 * @apiGroup Comments
 *
 * @apiParam {String}       userId                  ID of the user
 *
 * @apiUse commentsArray
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
    const { comments } = await act({ act: 'timeline', cmd: 'commentRetrive', userId });
    res.json({ comments });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {get} /comments/id/:commentId Retrieve comment by commentId
 * @apiName comments_retrieve_commentId
 * @apiPermission User
 * @apiGroup Comments
 *
 * @apiParam {String}       commentId               ID of the comment
 *
 * @apiUse comments
 *
 * @apiError (Error 500) {String} apiError            Error message ('commentNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "commentNotExist"
 *   }
 */
router.get('/id/:commentId', async (req, res) => {
  const { commentId } = req.params;
  try {
    const comments = await act({ act: 'timeline', cmd: 'commentRetrive', commentId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {post} /comments Create new comment
 * @apiName comments_create
 * @apiPermission User
 * @apiGroup Comments
 *
 * @apiParam {String}     userId                  UserId of the comment poster
 * @apiParam {String}     photoId                 PhotoId associated with the comment
 * @apiParam {String}     timestamp               Timestamp when the comment was created
 * @apiParam {String}     content                 Content of the comment
 *
 * @apiUse objectId
 *
 */
router.post('/', async (req, res) => {
  const { userId, photoId, timestamp, content } = req.body;
  try {
    const { id } = await act({ act: 'timeline', cmd: 'commentCreate', userId, photoId, timestamp, content });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {patch} /comments/id/:commentId Patch a comment
 * @apiName comments_patch
 * @apiPermission User
 * @apiGroup Comments
 *
 * @apiParam {String}     commentId               ID of the comment
 * @apiParam {String}     [userId]                UserId of the comment poster
 * @apiParam {String}     [photoId]               PhotoId associated with the comment
 * @apiParam {String}     [timestamp]             Timestamp when the comment was created
 * @apiParam {String}     [content]               Content of the comment
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} apiError        Error message ('commentNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "commentNotExist"
 *   }
 */
router.patch('/id/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { userId, photoId, timestamp, content } = req.body;
  try {
    const { id } = await act({ act: 'timeline', cmd: 'commentPatch', commentId, userId, photoId, timestamp, content });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

/**
 * @api {delete} /comments/id/:commentId Delete a comment
 * @apiName comments_delete
 * @apiPermission User
 * @apiGroup Comments
 *
 * @apiParam {String}     commentId               ID of the comment
 *
 * @apiUse objectId
 *
 * @apiError (Error 500) {String} apiError        Error message ('commentNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "commentNotExist"
 *   }
 */
router.delete('/id/:commentId', async (req, res) => {
  const { commentId } = req.params;
  try {
    const { id } = await act({ act: 'timeline', cmd: 'commentDelete', commentId });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.details.message });
  }
});

export default router;