import * as senecaClass from 'seneca';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

export const seneca = senecaClass();
export const act : any = Bluebird.promisify(seneca.act, {context: seneca});

export async function isValidLocation(locationId : String) {
  try {
    await act({role: 'location', cmd: 'locationRetrieve', locationId});
  } catch (e) {
    throw new Error('locationNotExist');
  }
}

export async function isValidUser(userId : String) {
  try{     
    await act({ role: 'auth', cmd: 'userRetrieve', userId }); 
  } catch(e) {     
    throw e; 
  }
}

export function isValidURL(url: String) {
  if (!_.isString(url)) {
    throw new Error('urlInvalid');
  }
}

export function isValidDescription(description : String) {
  if (!_.isString(description)) {
    throw new Error('invalidDescription');
  }
}

export async function retrieveUser(userId : String) {
  try{     
    return await act({ role: 'auth', cmd: 'userRetrieve', userId }); 
  } catch(e) {     
    throw e; 
  }
}

export async function retrieveLocation(locationId : String) {
  try {
    return await act({role: 'location', cmd: 'locationRetrieve', locationId});
  } catch (e) {
    throw new Error('locationNotExist');
  }
}

export async function retrieveLikes(photoId : String) {
  try {
    const { likes } = await act({ role: 'timeline', cmd: 'likeRetrieve', photoId });
    return likes.length;
  } catch (e) {
    throw new Error('locationNotExist');
  }
}

export async function retrieveComments(photoId : String) {
  try {
    const { comments } = await act({ role: 'timeline', cmd: 'commentRetrieve', photoId });
    return comments;
  } catch (e) {
    throw new Error('commentsNotExist');
  }
}