import * as senecaClass from 'seneca';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

export const seneca = senecaClass();
export const act : any = Bluebird.promisify(seneca.act, {context: seneca});

export function checkName(name : string, optional : boolean) {
  if (!_.isString(name)) {
    if (!optional) {
      throw new Error('invalidNameError');
    }
    return false;
  } else if (name.trim().length == 0) {
    throw new Error('invalidNameError');
  }
  return true;
}

export async function checkUser(userId : String, optional : boolean) {
  let res;

  if(!_.isString(userId)){
    if(!optional){
      throw new Error("userNotExist");
    }
    return false;
  }
  try{
    //res = await act({ role: 'auth', cmd: 'userRetrieve', userId});
  }catch(e){
    throw new Error("communicationError");
  }
  /*if(!res.user){
    throw new Error("userNotExist");
  }*/
  return true;
}

export function checkTimestamp(timestamp : string, optional : boolean){
    if(!_.isString(timestamp)){
        if(!optional){
            throw new Error("timestampError");
        }
        return false;
    }
    let castedTimestamp = new Date(timestamp);
    if(castedTimestamp.getTime() > 0){
        return true;
    }else{
        throw new Error("timestampError");
   }
}

export async function checkLocation(location : any, optional : boolean){
    const { id, startTime, endTime, comment} = location;
    let castedStartTime = new Date(startTime);
    let castedEndTime = new Date(endTime);
    if(_.isNil(location)){
        if(!optional){
            throw new Error("locationNotExist");
        }
        return false;
    }
    try{
        const {locations} = await act({ role: 'location', cmd: 'locationRetrieve', locationId: id });
    }catch(e){
        throw new Error("locationNotExist");
    }
    if( castedStartTime.getTime() <= 0 || 
        castedEndTime.getTime() <= 0 ||
        castedStartTime > castedEndTime
    ){
        throw new Error("startEndTimeError");
    }
    if(!_.isNil(comment)){
        if(!_.isString(comment) || comment.trim().length == 0){
            throw new Error("invalidCommentError");
        }
    }
    return true;
}

export async function checkLocations(locations : [any], optional: boolean){
    if(_.isNil(locations) || !_.isArray(locations) || locations.length == 0){
        if(!optional){
            throw new Error("invalidLocationsError");
        }
        return false;
    }
    for(var i = 0; i<locations.length; i++){
        console.log("Checking:", locations[i].id);
        await checkLocation(locations[i], false);
    }
    return true;
}
