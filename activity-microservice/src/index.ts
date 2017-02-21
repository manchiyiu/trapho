import * as seneca from 'seneca';

seneca()
  .add('cmd:sum', (msg, reply) => {
    reply(null, { answer: (msg.left + msg.right) });
  })
  .listen();