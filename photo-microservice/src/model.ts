import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export default class Photo {

  // initialize the structure of photo object
  id : String = null;
  userId : String = null;
  locationId : String = null;
  url : String = null;
  description : String = null;
  timestamp: String = null;
  photoTags: String[] = null;

  // define the photo schema
  static schema = new mongoose.Schema({
    userId: String,
    locationId: String,
    url: String,
    description: String,
    photoTags: [String],
    timestamp: { type: Date, default: Date.now }
  });

  // define a new model according to the schema
  static model = mongoose.model('Photo', Photo.schema);

  // create a new model according to this
  constructor(object : any) {
    const {userId, locationId, url, description, _id: id, timestamp, photoTags} = object;
    this.userId = userId;
    this.locationId = locationId;
    this.url = url;
    this.description = description;
    this.id = id;
    this.photoTags = photoTags;
    if (_.isUndefined(timestamp)) {
      this.timestamp = null; // set timestamp to null if not specified
    } else {
      this.timestamp = timestamp;
    }
    if (_.isUndefined(photoTags)) {
      this.photoTags = []; // set photoTags to empty array if not specified
    }
  }

  // save the photo model
  async save() {
    const model = new Photo.model({
      userId: this.userId,
      locationId: this.locationId,
      url: this.url,
      description: this.description,
      photoTags: this.photoTags});

    const product = await model.save();
    return product._id; // return the id of the created photo
  }

  // modify an existing photo
  async patch() {
    const newInfo = {
      userId: this.userId,
      locationId: this.locationId,
      url: this.url,
      description: this.description,
      photoTags: this.photoTags
    };
    try {
      await Photo.model.findByIdAndUpdate(this.id, newInfo); // modify the user
    } catch (e) {
      throw new Error('databaseError');
    }
  }

  // remove an existing photo
  static async remove(photoId : String) {
    await this.model.findByIdAndRemove(photoId);
  }

  // retrieve a photo by photoId
  static async retrieveById(photoId : String) {
    let res;
    try {
      res = await this.model.findById(photoId);
    } catch (e) {
      throw new Error('photoNotExist');
    }
    if (res == null) {
      throw new Error('photoNotExist');
    }
    return new Photo(res); // return a photo encapsulated in a Photo instance
  }

  // retrieve a list of photos uploaded by the user of that userId
  static async retrieveByUserId(userId : String) {
    let res;
    try {
      res = await this.model.find({ userId }, '-__v');
      res = res.map(item => new Photo(item));
      return res; // return a photo encapsulated in a Model instance
    } catch (e) {
      throw new Error('databaseError');
    }
  }

  // retrieve a list of photos taken at the location with that locationId
  static async retrieveByLocationId(locationId : String) {
    let res;
    try {
      res = await this.model.find({ locationId }, '-__v');
      res = res.map(item => new Photo(item));
      return res;  // return a photo encapsulated in a Model instance
    } catch (e) {
      throw new Error('databaseError');
    }
  }

  // retrieve a list of all photos
  static async retrieveAll() {
    let res;
    try {
      res = await this.model.find();
      res = res.map(item => new Photo(item));
      return res; // return a photo encapsulated in a Model instance
    } catch(e) {
      throw new Error('databaseError');
    }
  }

  // retrieve a list of photos filtered by condition, count limited to batchLimit, starting at batchNo
  static async retrieveMany(conditions : Object, batchLimit : number, batchNo : number) {
    let searchResult, result = [];
    if (batchLimit != Infinity) {
      searchResult = await Photo.model
        .find(conditions)
        .sort({ timestamp: -1 }) // decreasing order
        .limit(batchLimit) // only batchLimit result wanted
        .skip(batchNo); // skip the first {{batchNo}} result
    } else {
      searchResult = await Photo.model.find(conditions);
    }
    return searchResult.map(result => new Photo(result)); // return a photo encapsulated in a Model instance
  }

  // retrieve the number of photo taken at each location in the list locationIds
  static async retrieveLocationStat(locationIds: string[]) {
    let result:any = await Photo.model
      .aggregate([ // count photo by location
        {"$match": {"locationId": {"$in": locationIds}}},
        {"$group": {
          "_id": '$locationId',
          "photoCount": {"$sum": 1}
        }}
      ]).exec((err, res) => {
        if (err) {
          throw new Error("databaseError");
        }
        return res; // return the aggregation
      });
    return result;
  }

  // retrieve the list of locationsId associated with each photo in the list of photos
  static async retrieveLocationIds(photoIds: string[]) {
    let castedIds: any[] = [];
    photoIds.forEach(photoId => castedIds.push(new mongoose.Types.ObjectId(photoId)));
    let result:any = await Photo.model
      .aggregate([ // retrieve locationId by photoId
        {"$match": {"_id": {"$in": castedIds}}},
        {"$group": {
          "_id": '$locationId',
        }}
      ]).exec((err, res) => {
        if (err) {
          throw new Error("databaseError");
        }
        return res; // return the aggregation
      });
    return result;
  }
}