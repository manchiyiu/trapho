// {
//   _id: String,
//   userId: String,
//   photoId: String
//   timestamp: String,
// }

/**
 * @api {get} /likes/photos/:photoId Retrieve all likes by photoId
 * @apiName likes_photoId
 * @apiPermission User
 * @apiGroup Likes
 *
 * @apiParam {String}       photoId                 ID of the photo
 *
 * @apiSuccess {Comment[]}  likes                   Array containing likes associated with a photo, sorted by timestamp
 * @apiSuccessExample  {json} Success-Response:
 *   { "likes":
 *      [{
 *        "id": "1234567",
 *        "userId": "asdasdas",
 *        "timestamp": "2017-03-02T16:30:27+00:00"
 *      },
 *      {
 *        "id": "3123",
 *        "userId": "asd213asdas",
 *        "timestamp": "2017-03-02T16:40:27+00:00"
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
 * @api {get} /comments/users/:userId Retrieve all likes by userId
 * @apiName likes_userId
 * @apiPermission User
 * @apiGroup Likes
 *
 * @apiParam {String}       userId                  ID of the user
 *
 * @apiSuccess {Comment[]}  likes                   Array containing likes associated with a photo, sorted by timestamp
 * @apiSuccessExample  {json} Success-Response:
 *   { "likes":
 *      [{
 *        "id": "1234567",
 *        "photoId": "fsdfd23",
 *        "timestamp": "2017-03-02T16:39:27+00:00"
 *      },
 *      {
 *        "id": "3123",
 *        "photoId": "fsdfd12312323",
 *        "timestamp": "2017-03-02T16:40:27+00:00"
 *      }]
 *  }
 *
 * @apiError (Error 500) {String} apiError          Error message ('userNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "userNotExist"
 *   }
 */