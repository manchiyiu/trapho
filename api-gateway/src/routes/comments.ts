// {
//   _id: String,
//   userId: String,
//   photoId: String
//   timestamp: String,
//   content: String
// }

/**
 * @api {get} /comments/photos/:photoId Retrieve all comments by photoId
 * @apiName comments_photoId
 * @apiPermission User
 * @apiGroup Comments
 *
 * @apiParam {String}       photoId                 ID of the photo
 *
 * @apiSuccess {Comment[]}  comments                Array containing comments associated with a photo, sorted by timestamp
 *
 * @apiSuccessExample  {json} Success-Response:
 *   { "comments":
 *      [{
 *        "id": "1234567",
 *        "userId": "asdasdas",
 *        "photoId": "fsdfd23",
 *        "timestamp": "2017-03-02T16:39:27+00:00",
 *        "content": "wow. first!"
 *      },
 *      {
 *        "id": "3123",
 *        "userId": "asd213asdas",
 *        "photoId": "fsdfd12312323",
 *        "timestamp": "2017-03-02T16:40:27+00:00",
 *        "content": "wow. second!"
 *      }]
 *  }
 *
 * @apiError (Error 500) {String} apiError            Error message ('photoNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "photoNotExist"
 *   }
 */

/**
 * @api {get} /comments/users/:userId Retrieve all comments by userId
 * @apiName comments_userId
 * @apiPermission User
 * @apiGroup Comments
 *
 * @apiParam {String}       userId                  ID of the user
 *
 * @apiSuccess {Comment[]}  comments                Array containing comments associated with a photo, sorted by timestamp
 *
 * @apiSuccessExample  {json} Success-Response:
 *   { "comments":
 *      [{
 *        "id": "1234567",
 *        "userId": "asdasdas",
 *        "photoId": "fsdfd23",
 *        "timestamp": "2017-03-02T16:39:27+00:00",
 *        "content": "wow. first!"
 *      },
 *      {
 *        "id": "3123",
 *        "userId": "asd213asdas",
 *        "photoId": "fsdfd12312323",
 *        "timestamp": "2017-03-02T16:40:27+00:00",
 *        "content": "wow. second!"
 *      }]
 *  }
 *
 * @apiError (Error 500) {String} apiError            Error message ('userNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "userNotExist"
 *   }
 */

/**
 * @api {get} /comments/id/:commentId Retrieve comment by commentId
 * @apiName comments_commentId
 * @apiPermission User
 * @apiGroup Comments
 *
 * @apiParam {String}       commentId               ID of the comment
 *
 * @apiSuccess {String}     id                      ID of the comment
 * @apiSuccess {String}     userId                  UserId of the comment poster
 * @apiSuccess {String}     photoId                 PhotoId associated with the comment
 * @apiSucesss {String}     timestamp               Timestamp when the comment was created
 * @apiSuccess {String}     content                 Content of the comment
 *
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *      "id": "1234567",
 *      "userId": "asdasdas",
 *      "photoId": "fsdfd23",
 *      "timestamp": "2017-03-02T16:39:27+00:00",
 *      "content": "wow. first!"
 *   }
 *
 * @apiError (Error 500) {String} apiError            Error message ('commentNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "commentNotExist"
 *   }
 */

/**
 * @api {post} /comments/ Create new comment
 * @apiName comments_create
 * @apiPermission User
 * @apiGroup Comments
 *
 * @apiParam {String}     userId                  UserId of the comment poster
 * @apiParam {String}     photoId                 PhotoId associated with the comment
 * @apiParam {String}     timestamp               Timestamp when the comment was created
 * @apiParam {String}     content                 Content of the comment
 *
 * @apiSuccess {String}   id                      ID of the newly created comment
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *      "id": "1234567"
 *   }
 *
 */

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
 * @apiSuccess {String}   id                      ID of the patched comment
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *      "id": "1234567"
 *   }
 *
 * @apiError (Error 500) {String} apiError        Error message ('commentNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "commentNotExist"
 *   }
 */

/**
 * @api {delete} /comments/id/:commentId Delete a comment
 * @apiName comments_delete
 * @apiPermission User
 * @apiGroup Comments
 *
 * @apiParam {String}     commentId               ID of the comment
 *
 * @apiSuccess {String}   id                      ID of the deleted comment
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *      "id": "1234567"
 *   }
 *
 * @apiError (Error 500) {String} apiError        Error message ('commentNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "commentNotExist"
 *   }
 */