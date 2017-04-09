import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export default class Trip {

  id : string = null;
  name : string = null;
  userId : string = null;
  timestamp: string = null;
  startDate: string = null;
  endDate: string = null;
  locations: [object] = null;

  static schema = new mongoose.Schema({
    name: String,
    userId: String,
    startDate: String,
    endDate: String,
    timestamp: String,
    locations: [mongoose.Schema.Types.Mixed]
  });

  static model = mongoose.model('Trip', Trip.schema);

  constructor(object : any) {
    const {
      name,
      userId,
      timestamp,
      startDate,
      endDate,
      locations,
      _id: id
    } = object;

    Object.assign(this, { id, name, userId, startDate, endDate, timestamp, locations });
  }

  async save() {
    const model = new Trip.model({
      name: this.name,
      userId: this.userId,
      startDate: this.startDate,
      endDate: this.endDate,
      timestamp: this.timestamp,
      locations: this.locations
    });
    return await model
      .save()
      .then(product => mongoose.Types.ObjectId(product._id));
  }

  async update() {
    const modifiedTrip = {
      name: this.name,
      userId: this.userId,
      startDate: this.startDate,
      endDate: this.endDate,
      timestamp: this.timestamp,
      locations: this.locations
    };
    return await Trip.model
      .findByIdAndUpdate(this.id, modifiedTrip, (err, res) => {
        if (err) {
          throw new Error('databaseError');
        }
      });
  }

  static async retrieveById(tripId : string) {
    let result;
    try {
      result = await Trip.model.findById(tripId);
    } catch (e) {
      throw new Error('tripNotExist');
    }
    if (!result) {
      throw new Error('tripNotExist');
    } else {
      return new Trip(result);
    }
  }

  static async retrieveMany(conditions : Object, resultLimit : number) {
    let searchResult, result = [];
    if (resultLimit != Infinity) {
      searchResult = await Trip.model
        .find(conditions)
        .sort({ _id: -1 })
        .limit(resultLimit);
    } else {
      searchResult = await Trip.model.find(conditions);
    }
    return searchResult.map(result => new Trip(result));
  }

  static async removeById(tripId : string) {
    try {
      let obj = await Trip.retrieveById(tripId);
    } catch (e) {
      throw new Error('tripNotExist');
    }
    try {
      let result = await Trip.model.findByIdAndRemove(tripId);
    } catch (e) {
      throw new Error('databaseError');
    }
  }
}