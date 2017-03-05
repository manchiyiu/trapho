/**
 * @apiDefine objectId
 * @apiSuccess {String} id    ID of the modified/created/deleted resource
 * @apiSuccessExample {json} Success-Response:
 *    {
 *      "id": "{{id-placeholder}}"
 *    }
 */

// ------------- comments --------------

/**
 * @apiDefine commentsArray
 * @apiSuccess {Comment[]}  comments                Array containing comments associated with a photo, sorted by timestamp
 * @apiSuccess {String}     comments.id             ID of the comment
 * @apiSuccess {String}     comments.userId         UserId of the comment poster
 * @apiSuccess {String}     comments.photoId        PhotoId associated with the comment
 * @apiSuccess {String}     comments.timestamp      Timestamp when the comment was created
 * @apiSuccess {String}     comments.content        Content of the comment
 *
 * @apiSuccessExample  {json} Success-Response:
 *   { "comments":
 *      [{
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
 *      }]
 *  }
 */

/**
 * @apiDefine comments
 * @apiSuccess {String}     id                      ID of the comment
 * @apiSuccess {String}     userId                  UserId of the comment poster
 * @apiSuccess {String}     photoId                 PhotoId associated with the comment
 * @apiSuccess {String}     timestamp               Timestamp when the comment was created
 * @apiSuccess {String}     content                 Content of the comment
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *      "id": "{{id-placeholder}}",
 *      "userId": "{{id-placeholder}}",
 *      "photoId": "{{id-placeholder}}",
 *      "timestamp": "2017-03-02T16:39:27+00:00",
 *      "content": "wow. first!"
 *   }
 */

// ------------- likes --------------

/**
 * @apiDefine likes
 * @apiSuccess {Likes}  likes                   Like object
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "{{id-placeholder}}",
 *     "userId": "{{id-placeholder}}",
 *     "timestamp": "2017-03-02T16:30:27+00:00"
 *   }
 */


/**
 * @apiDefine likesArray
 * @apiSuccess {Likes[]}  likes                   Array containing likes, sorted by timestamp
 * @apiSuccessExample  {json} Success-Response:
 *   { "likes":
 *      [{
 *        "id": "{{id-placeholder}}",
 *        "userId": "{{id-placeholder}}",
 *        "timestamp": "2017-03-02T16:30:27+00:00"
 *      },
 *      {
 *        "id": "31{{id-placeholder}}23",
 *        "userId": "{{id-placeholder}}",
 *        "timestamp": "2017-03-02T16:40:27+00:00"
 *      }]
 *  }
 */

// ------------- locations --------------

/**
 * @apiDefine locations
 * @apiSuccess {Location[]} locations               Array containing all matching locations, empty array if no match. For detailed strucuture, please refer to "Retrieve location by id".
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "{{id-placeholder}}",
 *     "name": "Small Bridge Flowing Water",
 *     "description": "Some fun place.",
 *     "tags": ["CUHK", "fun"],
 *     "coordinates": {
 *       "lat": 23.02323,
 *       "lng": -23.323223
 *      },
 *     "rating": 7.8,
 *     "photoIds": ["{{id-placeholder}}", "{{id-placeholder}}"]
 *  }
 */

/**
 * @apiDefine locationsArray
 * @apiSuccess {Location[]} locations               Array containing all matching locations, empty array if no match. For detailed strucuture, please refer to "Retrieve location by id".
 * @apiSuccessExample  {json} Success-Response:
 *   { "locations":
 *      [{
 *        "id": "{{id-placeholder}}",
 *        "name": "Small Bridge Flowing Water",
 *        "description": "Some fun place.",
 *        "tags": ["CUHK", "fun"],
 *        "coordinates": {
 *          "lat": 23.02323,
 *          "lng": -23.323223
 *        },
 *        "rating": 7.8,
 *        "photoIds": ["{{id-placeholder}}", "{{id-placeholder}}"]
 *      }]
 *  }
 */

// ------------- photos --------------

/**
 * @apiDefine photos
 * @apiSuccess {String} id                      photo id
 * @apiSuccess {String} userId                  user id of the uploader
 * @apiSuccess {String} locationId              location id where the photo is taken
 * @apiSuccess {String} timestamp               time when the photo is uploaded (ISO 8601 format)
 * @apiSuccess {String} url                     url path of the photo
 * @apiSuccess {String} description             description of the photo added by the user
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "id": "{{id-placeholder}}",
 *     "userId": "{{id-placeholder}}",
 *     "locationId": "{{id-placeholder}}",
 *     "timestamp": "2017-03-02T16:39:27+00:00",
 *     "url": "http://trapho.com/whatver/fsdfsdfsdf.jpg",
 *     "description": "Wow. This is amazing."
 *   }
 */

/**
 * @apiDefine photosArray
 * @apiSuccess {Photo[]} photos                 array containing all matching photos
 * @apiSuccess {String} photos.id               photo id
 * @apiSuccess {String} photos.userId           user id of the uploader
 * @apiSuccess {String} photos.locationId       location id where the photo is taken
 * @apiSuccess {String} photos.timestamp        time when the photo is uploaded (ISO 8601 format)
 * @apiSuccess {String} photos.url              url path of the photo
 * @apiSuccess {String} photos.description      description of the photo added by the user
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "photos": [{
 *       "id": "{{id-placeholder}}",
 *       "userId": "{{id-placeholder}}",
 *       "locationId": "{{id-placeholder}}",
 *       "timestamp": "2017-03-02T16:39:27+00:00",
 *       "url": "http://trapho.com/whatver/fsdfsdfsdf.jpg",
 *       "description": "Wow. This is amazing."
 *     }]
 *   }
 */

// ------------- ratings --------------

/**
 * @apiDefine ratingsArray
 * @apiSuccess {Ratings[]} ratings             Array containing all ratings object
 * @apiSuccess {String} ratings.locationId     Location ID of the location associated with that rating
 * @apiSuccess {Number} ratings.rating         Rating value ([0, 10])
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "ratings": [{
 *        "locationId": "{{id-placeholder}}",
 *        "rating": 5.8
 *      },
 *      {
 *        "locationId": "{{id-placeholder}}",
 *        "rating": 6.89
 *      }]
 *   }
 */

/**
 * @apiDefine ratings
 * @apiSuccess {String} locationId     Location ID of the location associated with that rating
 * @apiSuccess {Number} rating         Rating value ([0, 10])
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "locationId": "{{id-placeholder}}",
 *     "rating": 5.8
 *   }
 */

// ------------- trips --------------

/**
 * @apiDefine tripsArray
 * @apiSuccess {Trip[]}     trips                        Array containing trip object
 * @apiSuccess {String}     trips.id                     ID of the trip
 * @apiSuccess {String}     trips.name                   Name of the trip
 * @apiSuccess {String}     trips.userId                 ID of the user who created the trip
 * @apiSuccess {String}     trips.timestamp              Timestamp when the trip is created
 * @apiSuccess {Object[]}   trips.locations              See below for object structure
 * @apiSuccess {String}     trips.locations.id           ID of the locationId
 * @apiSuccess {String}     trips.locations.startTime    Timestamp when the location visit starts
 * @apiSuccess {String}     trips.locations.endTime      Timestamp when the location visit ends
 * @apiSuccess {String}     trips.[locations.comment]    Custom user comments on the location
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *     "trips":  [{
 *        "id": "{{id-placeholder}}",
 *        "name": "Taiwan Trip",
 *        "userId": "{{id-placeholder}}",
 *        "timestamp": "2017-03-02T16:39:27+00:00",
 *        "locations": [
 *          {
 *           "id": "{{id-placeholder}}",
 *           "startTime": "2017-04-02T10:39:27+00:00",
 *           "endTime": "2017-04-02T16:39:27+00:00",
 *           "comment": "Must visit this, fun place!"
 *          }
 *       ]
 *     }]
 *   }

 */

/**
 * @apiDefine trips
 * @apiSuccess {String}     id                     ID of the trip
 * @apiSuccess {String}     name                   Name of the trip
 * @apiSuccess {String}     userId                 ID of the user who created the trip
 * @apiSuccess {String}     timestamp              Timestamp when the trip is created
 * @apiSuccess {Object[]}   locations              See below for object structure
 * @apiSuccess {String}     locations.id           ID of the locationId
 * @apiSuccess {String}     locations.startTime    Timestamp when the location visit starts
 * @apiSuccess {String}     locations.endTime      Timestamp when the location visit ends
 * @apiSuccess {String}     [locations.comment]    Custom user comments on the location
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *      "id": "{{id-placeholder}}",
 *      "name": "Taiwan Trip",
 *      "userId": "{{id-placeholder}}",
 *      "timestamp": "2017-03-02T16:39:27+00:00",
 *      "locations": [
 *        {
 *          "id": "{{id-placeholder}}",
 *          "startTime": "2017-04-02T10:39:27+00:00",
 *          "endTime": "2017-04-02T16:39:27+00:00",
 *          "comment": "Must visit this, fun place!"
 *        }
 *      ]
 *   }
 */