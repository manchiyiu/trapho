import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export default class Trip {

  // initialize the structure of trip object
  id : string = null;
  name : string = null;
  userId : string = null;
  timestamp: string = null;
  startDate: string = null;
  endDate: string = null;
  locations: [object] = null;

  // define the trip schema
  static schema = new mongoose.Schema({
    name: String,
    userId: String,
    startDate: String,
    endDate: String,
    timestamp: String,
    locations: [mongoose.Schema.Types.Mixed]
  });

  // define a new model according to the schema
  static model = mongoose.model('Trip', Trip.schema);

  // create the new object and assigned to this
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

  // save the object
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
      .then(product => mongoose.Types.ObjectId(product._id)); // return the id of the created object
  }

  // update the object
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
      .findByIdAndUpdate(this.id, modifiedTrip, (err, res) => { // ask database to update
        if (err) {
          throw new Error('databaseError');
        }
      });
  }

  // retrieve the object by tripId
  static async retrieveById(tripId : string) {
    let result;
    try {
      result = await Trip.model.findById(tripId); // try to retrieve the trip from database
    } catch (e) {
      throw new Error('tripNotExist');
    }
    if (!result) {
      throw new Error('tripNotExist');
    } else {
      return new Trip(result); // return the result encapsulated in Model object
    }
  }

  // retrieve the object by conditions and limit
  static async retrieveMany(conditions : Object, resultLimit : number) {
    let searchResult, result = [];
    if (resultLimit != Infinity) {
      searchResult = await Trip.model // ask database to retrieve trips according to the condition
        .find(conditions)
        .sort({ _id: -1 }) // decrasing order
        .limit(resultLimit); // limit the query to resultLimit
    } else {
      searchResult = await Trip.model.find(conditions); // if limit = Infinity, retrieve all
    }
    return searchResult.map(result => new Trip(result)); // return the list of result encapsulated in Model object
  }

  // remove the object by id
  static async removeById(tripId : string) {
    try {
      let obj = await Trip.retrieveById(tripId); // try to see if the object exists first
    } catch (e) {
      throw new Error('tripNotExist');
    }
    try {
      let result = await Trip.model.findByIdAndRemove(tripId); // remove by id
    } catch (e) {
      throw new Error('databaseError');
    }
  }
}