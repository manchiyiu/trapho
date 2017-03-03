/**
 * @api {get} /trips/id/:tripId Retrieve trip by tripId
 * @apiName trips_id
 * @apiPermission User
 * @apiGroup Trips
 *
 * @apiParam {String}       tripID                 ID of the trip
 *
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
 *      "id": "sadadasd",
 *      "name": "Taiwan Trip",
 *      "userId": "asadasd123",
 *      "timestamp": "2017-03-02T16:39:27+00:00",
 *      "locations": [
 *        {
 *          "id": "asdsaddas213",
 *          "startTime": "2017-04-02T10:39:27+00:00",
 *          "endTime": "2017-04-02T16:39:27+00:00",
 *          "comment": "Must visit this, fun place!"
 *        }
 *      ]
 *   }
 *
 * @apiError (Error 500) {String} apiError            Error message ('tripNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "tripNotExist"
 *   }
 */

/**
 * @api {post} /trips/ Create a trip
 * @apiName trips_create
 * @apiPermission User
 * @apiGroup Trips
 *
 * @apiParam {String}     name                   Name of the trip
 * @apiParam {String}     userId                 ID of the user who created the trip
 * @apiParam {String}     timestamp              Timestamp when the trip is created
 * @apiParam {Object[]}   locations              See below for object structure
 * @apiParam {String}     locations.id           ID of the locationId
 * @apiParam {String}     locations.startTime    Timestamp when the location visit starts
 * @apiParam {String}     locations.endTime      Timestamp when the location visit ends
 * @apiParam {String}     [locations.comment]    Custom user comments on the location
 *
 * @apiSuccess {String}   id                     ID of the newly created trip
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *      "id": "sadadasd"
 *   }
 *
 */

/**
 * @api {patch} /trips/id/:tripId Patch a trip
 * @apiName trips_patch
 * @apiPermission User
 * @apiGroup Trips
 *
 * @apiParam {String}     tripId                 ID of the trip to be patched
 * @apiParam {String}     name                   Name of the trip
 * @apiParam {String}     userId                 ID of the user who created the trip
 * @apiParam {String}     timestamp              Timestamp when the trip is created
 * @apiParam {Object[]}   locations              See below for object structure
 * @apiParam {String}     locations.id           ID of the locationId
 * @apiParam {String}     locations.startTime    Timestamp when the location visit starts
 * @apiParam {String}     locations.endTime      Timestamp when the location visit ends
 * @apiParam {String}     [locations.comment]    Custom user comments on the location
 *
 * @apiSuccess {String}   id                     ID of the patched trip
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *      "id": "sadadasd"
 *   }
 *
 */

/**
 * @api {delete} /trips/id/:tripId Delete a trip
 * @apiName trips_delete
 * @apiPermission User
 * @apiGroup Trips
 *
 * @apiParam {String}     tripId                 ID of the trip to be patched
 *
 * @apiSuccess {String}   id                     ID of the patched trip
 * @apiSuccessExample  {json} Success-Response:
 *   {
 *      "id": "sadadasd"
 *   }
 *
 * @apiError (Error 500) {String} apiError       Error message ('tripNotExist', 'databaseError', etc.)
 * @apiErrorExample {json} Error-Response:
 *   {
 *     "error": "tripNotExist"
 *   }
 *
 */