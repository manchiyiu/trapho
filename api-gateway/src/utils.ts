import * as senecaClass from 'seneca';
import * as Bluebird from 'bluebird';

export const seneca = senecaClass();
export const act = Bluebird.promisify(seneca.act, { context: seneca });