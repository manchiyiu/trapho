import * as mongoose from 'mongoose';

/* connect to the database */

mongoose.connect('mongodb://mongo/user');
mongoose.connection.on('error', () => {
  console.error('MongoDB connection error.');
});

/* define a schema */

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

export const User = mongoose.model('User', UserSchema);

/* export database connection */

export const db = mongoose.connection;
