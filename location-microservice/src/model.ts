import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export default class Location {

  id: string = null;
  name: string = null;
  description: string = null;
  tags: string[] = null;
  coordinates: [number, number] = [null, null] //Longitude, Latitude

  static schema = new mongoose.Schema({
    name: String,
    description: String,
    tags:[String],
    coordinates: {type: [Number], default: [0,0], index: "2dsphere"},
  });
  
  static model = mongoose.model('Location', Location.schema);

  constructor(object: any) {
    const { name, description, tags, coordinates, photoIds, rating,  _id: id } = object;
    this.id = id;
    this.name = name;
    this.description = description;
    this.tags = tags;
    this.coordinates = coordinates;

    if(typeof this.tags === "undefined"){
      this.tags = [];
    }

  }

  async save() {
    const model = new Location.model({
      name: this.name,
      description: this.description,
      tags: this.tags,
      coordinates: this.coordinates,
    });
    var result;
    await model.save().then(function(product){
      result = mongoose.Types.ObjectId(product._id);
    });
    return result;
  }

  async update(){
    const modifiedLocation = {
      name: this.name,
      description: this.description,
      tags: this.tags,
      coordinates: this.coordinates,
    };
    var result;
    await Location.model.findByIdAndUpdate(this.id, modifiedLocation, function(err, res){
      if(err){
        throw new Error('databaseError');
      }
    });
  }

  static async retrieveById(locationId:string){
    var result;
    try{
      result = await Location.model.findById(locationId, function(err, res){});
    }catch(e){
      throw new Error('locationNotExist');
    }
    if(!result){
      throw new Error('locationNotExist');
    }else{
      return new Location(result);
    }
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
      throw e;
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
      throw e;
    }

    for(var index in searchResult){
      result.push(new Location(searchResult[index].obj));
    }
    return result;
  }
  
  static async removeById(locationId:string){
    try{
      let obj = await Location.retrieveById(locationId);
    }catch(e){
      throw new Error('locationNotExist');
    }
    try{
      let result = await this.model.findByIdAndRemove(locationId, function(err, res){});
    }catch(e){
      throw new Error('databaseError');
    }
  }
}