import * as seneca from 'seneca';

import tripCreate from './actions/trip-create';
import tripDelete from './actions/trip-delete';
import tripPatch from './actions/trip-patch';
import tripRetrieve from './actions/trip-retrieve';

seneca()
  .add('cmd:tripCreate', tripCreate)
  .add('cmd:tripDelete', tripDelete)
  .add('cmd:tripPatch', tripPatch)
  .add('cmd:tripRetrieve', tripRetrieve)
  .listen();