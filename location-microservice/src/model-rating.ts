import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export default class Rating{
    id: string = null;
    userId: string = null;
    locationId: string = null;
    photoId: string = null;
    rating: number = null;

    static schema = new mongoose.Schema({
        userId: String,
        locationId: String,
        photoId:String, 
        rating: Number
    });

    static model = mongoose.model('Rating', Rating.schema);

    constructor(object: any){
        const{
            userId,
            locationId,
            photoId,
            rating,
            _id: id
        } = object;
        Object.assign(this, { id, userId, locationId, photoId, rating });
    }

    async save(){
        const model = new Rating.model({
            userId: this.userId,
            locationId: this.locationId,
            photoId: this.photoId,
            rating: this.rating
        });
        return await model
        .save()
        .then(product => mongoose.Types.ObjectId(product._id));
  }

  async update() {
    const modifiedRating = {
        userId: this.userId,
        locationId: this.locationId,
        photoId: this.photoId,
        rating: this.rating
    };
    return await Rating.model
      .findByIdAndUpdate(this.id, modifiedRating, (err, res) => {
        if (err) {
          throw new Error('databaseError');
        }
      });
  }

  static async retrieveMany(conditions : Object, resultLimit : number) {
    let searchResult, result = [];
    if (resultLimit != Infinity) {
      searchResult = await Rating.model
        .find(conditions)
        .sort({ _id: -1 })
        .limit(resultLimit);
    } else {
      searchResult = await Rating.model.find(conditions);
    }
    return searchResult.map(result => new Rating(result));
  }

  static async retrieveAvgRate(locationId : string){
    let result:any = await Rating.model
      .aggregate([
        {"$match": {"locationId": locationId}},
        {"$group": {
          "_id": '$userId',
          "avgSubRating": {"$avg": '$rating'}
        }},
        {"$group":{
          "_id": null,
          "avgRating": {"$avg": "$avgSubRating"}
        }}
      ]).exec((err, res) => {
        if(err){
          throw new Error("databaseError");
        }
        return res;
      });
    if(_.isNil(result)){
      throw new Error("ratingNotExist");
    }
    return result[0].avgRating;
    
  }

  static async removeOne(conditions : Object) {
    let objList = await Rating.retrieveMany(conditions, 1);
    if( objList.length < 0 ){
        throw new Error("ratingNotExist");
    }
    let obj = objList[0];
    try {
      let result = await this.model.findByIdAndRemove(obj.id);
      return obj.id;
    } catch (e) {
      throw new Error('databaseError');
    }
  }
}