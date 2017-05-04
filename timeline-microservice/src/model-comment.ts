import * as mongoose from 'mongoose';

export default class Comment {

  // initialize the structure of comment object
  id : String = null;
  userId : String = null;
  photoId : String = null;
  timestamp : String = null;
  content : String = null;

  // define the comment schema
  static schema = new mongoose.Schema({
    userId: String,
    photoId: String,
    timestamp: String,
    content: String
  });

  // define a new model according to the schema
  static model = mongoose.model('Comment', Comment.schema);

  // create the new object and assigned to this
  constructor(object: any) {
    const {userId, photoId, timestamp, content, _id: id} = object;
    this.userId = userId;
    this.photoId = photoId;
    this.timestamp = timestamp;
    this.content = content;
    this.id = id;
  }

  // save the comment object
  async save() {
    const model = new Comment.model({userId: this.userId, photoId: this.photoId, timestamp: this.timestamp, content: this.content});
    const product = await model.save();
    return product._id; // return the id of the created comment
  }

  // retrieve comment by commentId
  static async retrieveById(commentId) {
    let res;
    try {
        res = await Comment.model.findById(commentId);
    } catch(e) {
        throw new Error('commentNotExist');
    }
    if (res == null) {
        throw new Error('commentNotExist');
    }
    return new Comment(res); // return the comment object encapsulated in the Like object
  }

  // remove comment by commentId
  static async remove(commentId) {
      await Comment.model.findByIdAndRemove(commentId);
  }

  // retrieve photo by photoId
  static async retrieveByPhotoId(photoId) {
    let res;
    try {
      res = await this.model.find({ photoId });
      res = res.map(item => new Comment(item));
      return res; // return the comment object encapsulated in the Comment object
    } catch (e) {
      throw new Error('databaseError');
    }
  }

  // retrieve photo by userId
  static async retrieveByUserId(userId) {
    let res;
    try {
      res = await this.model.find({ userId });
      res = res.map(item => new Comment(item));
      return res; // return the comment object encapsulated in the Comment object
    } catch (e) {
      throw new Error('databaseError');
    }
  }

  // modify the comment
  async patch() {
    const newInfo = {
      userId: this.userId,
      photoId: this.photoId,
      timestamp: this.timestamp,
      content: this.content
    };
    try {
      await Comment.model.findByIdAndUpdate(this.id, newInfo);
    } catch (e) {
      throw new Error('databaseError');
    }
  }

}