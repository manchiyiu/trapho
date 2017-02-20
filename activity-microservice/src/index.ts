import * as express from 'express';
import * as seneca from 'seneca';

const app = express();

seneca()
  .add('role:math,cmd:sum', (msg, reply) => {
    reply(null, { answer: (msg.left + msg.right) });
  })
  .listen();