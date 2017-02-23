import { seneca } from './utils';
import { User } from './database';

import login from './actions/login';
import signup from './actions/signup';
import deserialize from './actions/deserialize';

seneca
  .add('cmd:login', login)
  .add('cmd:signup', signup)
  .add('cmd:deserialize', deserialize)
  .listen();
