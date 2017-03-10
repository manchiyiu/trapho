import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export default class Location {

  id : string = null;
  name : string = null;
  description : string = null;
  tags : string[] = null;
  coordinates: [number, number] = [null, null]; //Longitude, Latitude

  static schema = new mongoose.Schema({
    name: String,
    description: String,
    tags: [String],
    coordinates: {
      type: [Number],
      default: [0, 0],
      index: '2dsphere'
    }
  });

  static model = mongoose.model('Location', Location.schema);

  constructor(object : any) {
    const {
      name,
      description,
      tags,
      coordinates,
      photoIds,
      rating,
      _id: id
    } = object;

    Object.assign(this, { id, name, description, tags, coordinates });
    this.tags = this.tags || [];
  }

  async save() {
    const model = new Location.model({
      name: this.name,
      description: this.description,
      tags: this.tags,
      coordinates: this.coordinates
    });
    return await model
      .save()
      .then(product => mongoose.Types.ObjectId(product._id));
  }

  async update() {
    const modifiedLocation = {
      name: this.name,
      description: this.description,
      tags: this.tags,
      coordinates: this.coordinates
    };
    return await Location.model
      .findByIdAndUpdate(this.id, modifiedLocation, (err, res) => {
        if (err) {
          throw new Error('databaseError');
        }
      });
  }

  static async retrieveById(locationId : string) {
    let result;
    try {
      result = await Location.model.findById(locationId);
    } catch (e) {
      throw new Error('locationNotExist');
    }
    if (!result) {
      throw new Error('locationNotExist');
    } else {
      return new Location(result);
    }
  }

  static async retrieveMany(conditions : Object, resultLimit : number) {
    let searchResult, result = [];
    if (resultLimit != Infinity) {
      searchResult = await Location.model
        .find(conditions)
        .sort({ _id: -1 })
        .limit(resultLimit);
    } else {
      searchResult = await Location.model.find(conditions);
    }
    return searchResult.map(result => new Location(result));
  }

  static async retrieveManyByDist(conditions : Object, coordinates : number[], maxDistance : number, resultLimit : number) {
    let searchResult, result = [];
    let point = { coordinates: coordinates, type: 'Point' };

    if (resultLimit != Infinity) {
      searchResult = await Location.model
        .geoNear(point, {
          maxDistance: maxDistance,
          spherical: true,
          query: conditions,
          limit: resultLimit
        });
    } else {
      searchResult = await Location.model
        .geoNear(point, {
          maxDistance: maxDistance,
          spherical: true,
          query: conditions
        });
    }
    return searchResult.map(item => new Location(item.obj));
  }

  static async removeById(locationId : string) {
    try {
      let obj = await Location.retrieveById(locationId);
    } catch (e) {
      throw new Error('locationNotExist');
    }
    try {
      let result = await this.model.findByIdAndRemove(locationId);
    } catch (e) {
      throw new Error('databaseError');
    }
  }
}