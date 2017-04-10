import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export default class Photo {

  id : String = null;
  userId : String = null;
  locationId : String = null;
  url : String = null;
  description : String = null;
  timestamp: String = null;
  photoTags: String[] = null;

  static schema = new mongoose.Schema({
    userId: String,
    locationId: String,
    url: String,
    description: String,
    photoTags: [String],
    timestamp: { type: Date, default: Date.now }
  });

  static model = mongoose.model('Photo', Photo.schema);

  constructor(object : any) {
    const {userId, locationId, url, description, _id: id, timestamp, photoTags} = object;
    this.userId = userId;
    this.locationId = locationId;
    this.url = url;
    this.description = description;
    this.id = id;
    this.photoTags = photoTags;
    if(_.isUndefined(timestamp)){
      this.timestamp = null;
    }else{
      this.timestamp = timestamp;
    }
    if(_.isUndefined(photoTags)){
      this.photoTags = [];
    }
  }

  async save() {
    const model = new Photo.model({
      userId: this.userId, 
      locationId: this.locationId, 
      url: this.url, 
      description: this.description, 
      photoTags: this.photoTags});
    
    const product = await model.save();
    return product._id; // _id is String, can use directly for find
  }

  async patch() {
    const newInfo = {
      userId: this.userId,
      locationId: this.locationId,
      url: this.url,
      description: this.description,
      photoTags: this.photoTags
    };
    try {
      await Photo.model.findByIdAndUpdate(this.id, newInfo);
    } catch (e) {
      throw new Error('databaseError');
    }
  }

  static async remove(photoId : String) {
    await this.model.findByIdAndRemove(photoId);
  }

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
    return new Photo(res);
  }

  static async retrieveByUserId(userId : String) {
    let res;
    try {
      res = await this.model.find({ userId }, '-__v');
      res = res.map(item => new Photo(item));
      return res;
    } catch (e) {
      throw new Error('databaseError');
    }
  }

  static async retrieveByLocationId(locationId : String) {
    let res;
    try {
      res = await this.model.find({ locationId }, '-__v');
      //                    .sort( {  } )
      res = res.map(item => new Photo(item));
      return res;
    } catch (e) {
      throw new Error('databsaeError');
    }
  }

  static async retrieveAll(){
    let res;
    try{
      res = await this.model.find();
      res = res.map(item => new Photo(item));
      return res;
    } catch(e) {
      throw new Error('databaseError');
    }
  }
    static async retrieveMany(conditions : Object, batchLimit : number, batchNo : number) {
    let searchResult, result = [];
    if (batchLimit != Infinity) {
      searchResult = await Photo.model
        .find(conditions)
        .sort({ timestamp: -1 })
        .limit(batchLimit)
        .skip(batchNo*batchLimit);
    } else {
      searchResult = await Photo.model.find(conditions);
    }
    return searchResult.map(result => new Photo(result));
  }
  static async retrieveLocationStat(locationIds: string[]){
    let result:any = await Photo.model
      .aggregate([
        {"$match": {"locationId": {"$in": locationIds}}},
        {"$group": {
          "_id": '$locationId',
          "photoCount": {"$sum": 1}
        }}
      ]).exec((err, res) => {
        if(err){
          throw new Error("databaseError");
        }
        return res;
      });
    return result;
  }

  static async retrieveLocationIds(photoIds: string[]){
    let castedIds:any[] = [];
    photoIds.forEach(photoId => castedIds.push(new mongoose.Types.ObjectId(photoId)));
    let result:any = await Photo.model
      .aggregate([
        {"$match": {"_id": {"$in": castedIds}}},
        {"$group": {
          "_id": '$locationId',
        }}
      ]).exec((err, res) => {
        if(err){
          throw new Error("databaseError");
        }
        return res;
      });
    return result;
  }
}