import * as senecaClass from 'seneca';
import * as Bluebird from 'bluebird';

export const seneca = senecaClass();
export const act: any = Bluebird.promisify(seneca.act, { context: seneca });

export const SERVER_SECRET = 'thisistheserversecret';

export const errorMiddleware
  = (err, req, res, next) => {
  let error = 'unknownError';
  if (err.seneca === true) { /* is a seneca error */
    error = err.details.message;
  } else if (err.name === 'UnauthorizedError') { /* unauthorized */
    error = 'authError';
    res.status(403).json({ status: 'error', error });
    return;
  }
  res.status(403).json({ status: 'error', error });
};
