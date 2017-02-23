import * as senecaClass from 'seneca';
import * as Bluebird from 'bluebird';

export const seneca = senecaClass();
export const act: any = Bluebird.promisify(seneca.act, { context: seneca });

export const SERVER_SECRET = 'thisistheserversecret';
