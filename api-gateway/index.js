const express = require('express');
const seneca = require('seneca')();

const app = express();

seneca
  .client({ host: 'activity-microservice' });

app.get('/', (req, res) => {
  seneca.act({ role: 'math', cmd: 'sum', left: 1, right: 2 }, (err, result) => {
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000.');
});