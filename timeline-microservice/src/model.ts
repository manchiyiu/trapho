import * as mongoose from 'mongoose';

export default class Like {

  id : String = null;
  userId : String = null;
  photoId : String = null;


  static schema = new mongoose.Schema({
    userId: String,
    photoId: String
  });

  static model = mongoose.model('Like', Like.schema);

  constructor(object: any){
    const {userId, photoId, _id: id} = object;
    this.userId = userId;
    this.photoId = photoId;
    this.id = id;
  }

  async save(){
    const model = new Like.model({userId: this.userId, photoId: this.photoId})
    const product = await model.save();
    return product._id;
  }

  static async retrieveById(likeId: String){
    let res;
    try{
      res = await this.model.findById(likeId);
    } catch(e) {
      throw new Error('likeNotExist');
    }
    if (res == null){
      throw new Error('likeNotExist');
    }
    return new Like(res);
  }

  static async retrieveUniquelyByQuery(query){
    const {userId, photoId} = query;
    let res;
    try{
      res = await this.model.findOne({userId, photoId});
    } catch(e) {
      throw new Error('likeNotExist');
    }
    if (res == null){
      throw new Error('likeNotExist');
    }
    return new Like(res);
  }

  static async remove(likeId: String){
    await this.model.findByIdAndRemove(likeId);
  }

  static async retrieveByUserId(userId: String){
    let res;
    try {
      res = await this.model.find({ userId }, '-__v');
      res = res.map(item => new Like(item));
      console.log(res);
      return res;
    } catch (e) {
      throw new Error('databaseError');
    }
  }

  static async retrieveByPhotoId(photoId: String){
    let res;
    try {
      res = await this.model.find({ photoId }, '-__v');
      res = res.map(item => new Like(item));
      return res;
    } catch (e) {
      throw new Error('databaseError');
    }
  }


}