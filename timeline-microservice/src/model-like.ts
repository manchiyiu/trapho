import * as mongoose from 'mongoose';

export default class Like {

  // initialize the structure of like object
  id : String = null;
  userId : String = null;
  photoId : String = null;

  // define the like schema
  static schema = new mongoose.Schema({
    userId: String,
    photoId: String
  });

  // define a new model according to the schema
  static model = mongoose.model('Like', Like.schema);

  // create the new object and assigned to this
  constructor(object: any) {
    const {userId, photoId, _id: id} = object;
    this.userId = userId;
    this.photoId = photoId;
    this.id = id;
  }

  // save the object
  async save() {
    const model = new Like.model({ userId: this.userId, photoId: this.photoId });
    const product = await model.save();
    return product._id; // return the id of the created object
  }

  // retrieve the object by likeId
  static async retrieveById(likeId: String) {
    let res;
    try {
      res = await this.model.findById(likeId);
    } catch(e) {
      throw new Error('likeNotExist');
    }
    if (res == null) {
      throw new Error('likeNotExist');
    }
    return new Like(res); // return the like object encapsulated in Like object
  }

  // retrieve like by userId and photoId, only return the first one
  static async retrieveUniquelyByQuery(query) {
    const {userId, photoId} = query;
    let res;
    try {
      res = await this.model.findOne({userId, photoId});
    } catch(e) {
      throw new Error('likeNotExist');
    }
    if (res == null) {
      throw new Error('likeNotExist');
    }
    return new Like(res);
  }

  // remove the like by likeId
  static async remove(likeId: String) {
    await this.model.findByIdAndRemove(likeId);
  }

  // retrieve like by userId
  static async retrieveByUserId(userId: String) {
    let res;
    try {
      res = await this.model.find({ userId }, '-__v');
      res = res.map(item => new Like(item));
      return res; // return the like object encapsulated in the Like object
    } catch (e) {
      throw new Error('databaseError');
    }
  }

  // retrieve like objects associated with a particular photoId
  static async retrieveByPhotoId(photoId: String) {
    let res;
    try {
      res = await this.model.find({ photoId }, '-__v');
      res = res.map(item => new Like(item));
      return res; // return the like object encapsulated in the Like object
    } catch (e) {
      throw new Error('databaseError');
    }
  }


}