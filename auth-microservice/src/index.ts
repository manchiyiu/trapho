import * as seneca from 'seneca';
import { User } from './database';

seneca()
  .add('cmd:sum', (msg, reply) => {
    const user = new User({ username: 'test', password: '123' });
    user.save(err => {
      if (err) {
        console.error(err);
      }
      console.log('saved');
    });
    reply(null, { answer: (msg.left + msg.right) });
  })
  .listen();