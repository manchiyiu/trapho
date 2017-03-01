import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export default class Location {

  id: string = null;
  name: string = null;
  coordinates: [number, number] = [null, null] //Longitude, Latitude
  description: string = null;
  rating: number = null;
  personRated: number = null;
  photoRated: {} = {};

  static schema = new mongoose.Schema({
    name: String,
    coordinates: {type: [Number], default: [0,0], index: "2dsphere"},
    description: String,
    rating: Number,
    personRated: Number,
    photoRated: {}
  });
  

  static model = mongoose.model('Location', Location.schema);

  static async retrieve(query: Object) {
    let result;
    try {
      result = await this.model.findOne(query);
      if (!result) throw new Error();
    } catch (e) {
      return null;
    }
    return new Location(result);
  }

  constructor(object: any) {
    const { name, coordinates, description, rating, personRated, photoRated, _id: id } = object;
    this.name = name;
    this.coordinates = coordinates;
    this.description = description
    this.rating = rating;
    this.id = id;
    this.personRated = personRated;
    this.photoRated = photoRated;
    if(typeof this.rating === "undefined"){
      this.rating = 0;
    }
    if(typeof this.personRated === "undefined"){
      this.personRated = 0;
    }
    if(typeof this.photoRated === "undefined"){
      this.photoRated = {};
    }
  }

  async save() {
    const model = new Location.model({
      name: this.name,
      coordinates: this.coordinates,
      description: this.description,
      rating: this.rating,
      personRated: this.personRated,
      photoRated: this.photoRated
    });
    var result;
    await model.save().then(function(product){
      result = mongoose.Types.ObjectId(product._id);
    });
    return result;
  }

  update(){
    const modifiedLocation = {
      name: this.name,
      coordinates: this.coordinates,
      description: this.description,
      rating: this.rating,
      personRated: this.personRated,
      photoRated: this.photoRated
    };
    return Location.model.findOneAndUpdate({"_id": this.id}, modifiedLocation, function (err, docs) {
      if(err){
        console.log("Err when updating location: ", err);
      }
    });
  }

  static async retrieveMany(conditions:Object, resultLimit:number){
    let searchResult, result = [];
    try{
      if(resultLimit != Infinity){
        searchResult = await Location.model.find(conditions,function (err, docs) {}).sort({_id:-1}).limit(resultLimit);
      }else{
        searchResult = await Location.model.find(conditions,function (err, docs) {});
      }
      
    }catch(e){
      console.log("Err:", e);
      return null;
    }
    for(var index in searchResult){
      result.push(new Location(searchResult[index]));
    }
    return result;
  }

  static async retrieveManyByDist(conditions:Object, coordinates:number[], maxDistance:number, resultLimit:number){
    var searchResult, result = [];
    let point =  { coordinates: coordinates, type: 'Point' };    
    try{
      if(resultLimit != Infinity){
        searchResult = await Location.model.geoNear(point, {maxDistance: maxDistance, spherical: true, query:conditions, limit:resultLimit}, function(err, res, stats){});
      }else{
        searchResult = await Location.model.geoNear(point, {maxDistance: maxDistance, spherical: true, query:conditions}, function(err, res, stats){});
      }
    }catch(e){
      console.log("Err:", e);
      return null;
    }

    for(var index in searchResult){
      result.push(new Location(searchResult[index].obj));
    }
    return result;
  }
}