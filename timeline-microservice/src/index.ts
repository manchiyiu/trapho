import * as express from 'express';
import * as seneca from 'seneca';

const app = express();

seneca()
  .add('role:timeline,cmd:sum', (msg, reply) => {
    reply(null, { answer: (msg.left + msg.right) });
  })
  .listen();