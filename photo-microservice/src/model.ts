import * as mongoose from 'mongoose';

export default class Photo {

  id : String = null;
  userId : String = null;
  locationId : String = null;
  url : String = null;
  description : String = null;

  static schema = new mongoose.Schema({
    userId: String,
    locationId: String,
    url: String,
    description: String
  });

  static model = mongoose.model('Photo', Photo.schema);

  constructor(object : any) {
    const {userId, locationId, url, description, _id: id} = object;
    this.userId = userId;
    this.locationId = locationId;
    this.url = url;
    this.description = description;
    this.id = id;
  }

  async save() {
    const model = new Photo.model({userId: this.userId, locationId: this.locationId, url: this.url, description: this.description});
    const product = await model.save();
    return product._id; // _id is String, can use directly for find
  }

  async patch() {
    const newInfo = {
      userId: this.userId,
      locationId: this.locationId,
      url: this.url,
      description: this.description
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
}