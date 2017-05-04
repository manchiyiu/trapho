import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export default class Rating {

  // initialize the structure of rating object
  id : string = null;
  userId : string = null;
  locationId : string = null;
  photoId : string = null;
  rating : number = null;

  // define the rating schema
  static schema = new mongoose.Schema({
    userId: String,
    locationId: String,
    photoId: String,
    rating: Number
  });

  // define a new model according to the schema
  static model = mongoose.model('Rating', Rating.schema);

  // create the new object and assigned to this
  constructor(object : any) {
    const {userId, locationId, photoId, rating, _id: id} = object;
    Object.assign(this, {id, userId, locationId, photoId, rating});
  }

  // save the rating object
  async save() {
    const model = new Rating.model({userId: this.userId, locationId: this.locationId, photoId: this.photoId, rating: this.rating});
    return await model
      .save()
      .then(product => mongoose.Types.ObjectId(product._id)); // return the id of the rating created
  }

  // update an existing rating object
  async update() {
    const modifiedRating = {
      userId: this.userId,
      locationId: this.locationId,
      photoId: this.photoId,
      rating: this.rating
    };
    return await Rating
      .model
      .findByIdAndUpdate(this.id, modifiedRating, (err, res) => {
        if (err) {
          throw new Error('databaseError');
        }
      });
  }

  // retrieve a list of rating object according to condition
  static async retrieveMany(conditions: Object, resultLimit: number) {
    let searchResult,
      result = [];
    if (resultLimit != Infinity) {
      searchResult = await Rating
        .model
        .find(conditions)
        .sort({_id: -1})
        .limit(resultLimit);
    } else {
      searchResult = await Rating
        .model
        .find(conditions);
    }
    return searchResult.map(result => new Rating(result));
  }

  // calculate the average rating of a location
  static async retrieveAvgRate(locationId : string) {
    let result : any = await Rating
      .model
      .aggregate([ // sum up all the rating value of the ratings associated with a location and obtain the average
        {
          "$match": {
            "locationId": locationId
          }
        },
        {
          "$group": {
            "_id": '$userId',
            "avgSubRating": {
              "$avg": '$rating' // calculate average
            }
          }
        },
        {
          "$group": {
            "_id": null,
            "avgRating": {
              "$avg": "$avgSubRating"
            }
          }
        }
      ])
      .exec((err, res) => {
        if (err) {
          throw new Error("databaseError");
        }
        return res;
      });

    // if no result => throw error
    if (_.isNil(result)) {
      throw new Error("ratingNotExist");
    }
    if (_.isUndefined(result[0])) {
      return null;
    } else {
      return result[0].avgRating;
    }
  }

  // remove one rating according to condition
  static async removeOne(conditions : Object) {
    let objList = await Rating.retrieveMany(conditions, 1); // retrieve many matches
    if (objList.length < 0) {
      throw new Error("ratingNotExist");
    }
    let obj = objList[0]; // only remove the first one
    try {
      let result = await this
        .model
        .findByIdAndRemove(obj.id);
      return obj.id;
    } catch (e) {
      throw new Error('databaseError');
    }
  }
}