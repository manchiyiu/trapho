import * as senecaClass from 'seneca';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

export const seneca = senecaClass();
export const act : any = Bluebird.promisify(seneca.act, {context: seneca});

export async function isValidUser(userId : String) {
  try{     
    await act({ role: 'auth', cmd: 'userRetrieve', userId }); 
  } catch(e) {     
    throw e; 
  }
}

export async function isValidPhoto(photoId: String){
  try{
    await act({ role: 'photo', cmd: 'photoRetrieve', photoId });
  } catch(e){
    throw e;
  }
}

export async function isValidTime(timestamp: String){
  if(!_.isString(timestamp)){
    throw new Error("timestampError");
  }
  let castedTimestamp = new Date(timestamp);
  if(castedTimestamp.getTime() <= 0){
    throw new Error("timestampError");
  }
}

export async function isValidContent(content: String){
  if (!_.isString(content)) {
    throw new Error('contentError');
  }
}