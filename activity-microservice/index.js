const express = require('express');
const seneca = require('seneca')();

const app = express();

seneca
  .add('role:math,cmd:sum', (msg, reply) => {
    reply(null, { answer: (msg.left + msg.right) });
  })
  .listen();