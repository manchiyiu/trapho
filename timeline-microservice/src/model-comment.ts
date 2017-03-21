import * as mongoose from 'mongoose';

export default class Comment {

  id : String = null;
  userId : String = null;
  photoId : String = null;
  timestamp : String = null;
  content : String = null;


  static schema = new mongoose.Schema({
    userId: String,
    photoId: String,
    timestamp: String,
    content: String
  });

  static model = mongoose.model('Comment', Comment.schema);

  constructor(object: any){
    const {userId, photoId, timestamp, content, _id: id} = object;
    this.userId = userId;
    this.photoId = photoId;
    this.timestamp = timestamp;
    this.content = content;
    this.id = id;
  }

  async save(){
    const model = new Comment.model({userId: this.userId, photoId: this.photoId, timestamp: this.timestamp, content: this.content});
    const product = await model.save();
    return product._id;
  }

  static async retrieveById(commentId){
    let res;
    try{
        res = await Comment.model.findById(commentId);
    }catch(e){
        throw new Error('commentNotExist');
    }
    if (res == null){
        throw new Error('commentNotExist');
    }
    return new Comment(res);
  }

  static async remove(commentId){
      await Comment.model.findByIdAndRemove(commentId);
  }

  static async retrieveByPhotoId(photoId){

  }

  static async retrieveByUserId(userId){
      
  }


}