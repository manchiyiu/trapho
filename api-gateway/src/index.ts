import * as express from 'express';
import * as senecaClass from 'seneca';
import * as Bluebird from 'bluebird';

const seneca = senecaClass();

const act = Bluebird.promisify(seneca.act, { context: seneca });

const app = express();

seneca
  .client({ host: 'activity-microservice', pin: 'role:activity' })
  .client({ host: 'auth-microservice', pin: 'role:auth' })
  .client({ host: 'location-microservice', pin: 'role:location' })
  .client({ host: 'storage-microservice', pin: 'role:storage' })
  .client({ host: 'timeline-microservice', pin: 'role:timeline' });

app.get('/', async (req, res) => {

  console.log('--- testing ---\n\n');

  let result;

  try {
    let result = await act({ role: 'location', cmd: 'sum', left: 1, right: 2 });
    console.log('location', result);

    result = await act({ role: 'timeline', cmd: 'sum', left: 1, right: 2 });
    console.log('timeline');

    result = await act({ role: 'auth', cmd: 'sum', left: 1, right: 2 });
    console.log('auth');

    result = await act({ role: 'storage', cmd: 'sum', left: 1, right: 2 });
    console.log('storage');

    result = await act({ role: 'activity', cmd: 'sum', left: 1, right: 2 });
    console.log('activity');

    console.log('\n--------');
  } catch (e) {
    console.error(e);
  }

});

app.listen(3000, () => {
  console.log('App listening on port 3000.');
});