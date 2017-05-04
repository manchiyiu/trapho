import * as senecaClass from 'seneca';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

export const seneca = senecaClass();
export const act : any = Bluebird.promisify(seneca.act, {context: seneca});

// check if user really exist by calling auth-microservie to try to retrieve the user by userId
export async function isValidUser(userId : String) {
  try {
    await act({ role: 'auth', cmd: 'userRetrieve', userId });
  } catch(e) {
    throw e;
  }
}

// check if photo really exist by calling photo-microservie to try to retrieve the photo by photoId
export async function isValidPhoto(photoId: String) {
  try {
    await act({ role: 'photo', cmd: 'photoRetrieve', photoId });
  } catch(e) {
    throw e;
  }
}

// check if a timestamp is really valid
export async function isValidTime(timestamp: String) {
  if (!_.isString(timestamp)) {
    throw new Error("timestampError");
  }
  let castedTimestamp = new Date(timestamp); // try to parse the date string to see if possible
  if (castedTimestamp.getTime() <= 0) {
    throw new Error("timestampError");
  }
}

// check if the content is in valid format
export async function isValidContent(content: String) {
  if (!_.isString(content)) {
    throw new Error('contentError');
  }
}