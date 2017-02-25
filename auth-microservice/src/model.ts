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

}
