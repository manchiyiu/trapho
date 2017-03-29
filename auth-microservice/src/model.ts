import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export default class User {

  id: string = null;
  username: string = null;
  password: string = null;

  static schema = new mongoose.Schema({
    username: String,
    password: String
  });

  static model = mongoose.model('User', User.schema);

  static async retrieve(query: Object) {
    let result;
    try {
      result = await this.model.findOne(query);
      if (!result) throw new Error();
    } catch (e) {
      return null;
    }
    return new User(result);
  }

  constructor(object: any) {
    const { username, password, _id: id } = object;
    this.username = username;
    this.password = password;
    this.id = id;
  }

  save() {
    const model = new User.model({
      username: this.username,
      password: this.password
    });
    return model.save();
  }

  async patch(){
    const newInfo = {
      username: this.username,
      password: this.password
    }
    try {
      await User.model.findByIdAndUpdate(this.id, newInfo);
    } catch (e) {
      throw new Error('databaseError');
    }
  }

  static async retrieveById(userId: String){
    let result;
    try{
      result = await User.model.findById(userId);
    } catch(e) {
      throw new Error(e);
    }
    return new User(result);
  }

static async retrieveMany(conditions : Object, resultLimit : number) {
    let searchResult, result = [];
    if (resultLimit != Infinity) {
      searchResult = await User.model
        .find(conditions)
        .sort({ _id: -1 })
        .limit(resultLimit);
    } else {
      searchResult = await User.model.find(conditions);
    }
    return searchResult.map(result => new User(result));
  }

  static async remove(userId: String){
    await User.model.findByIdAndRemove(userId);
  }

}
