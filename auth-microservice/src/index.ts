import { seneca } from './utils';
import { User } from './database';

import login from './actions/login';
import signup from './actions/signup';

seneca
  .add('cmd:login', login)
  .add('cmd:signup', signup)
  .listen();
