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

export async function retrieveUsersByNames(usernames : String[]){
  try{
    let query:any = {};
    query.username = {};
    query.username.$in = usernames;
    return await act({ role: 'auth', cmd: 'userRetrieve', query });
  } catch(e){
    console.log("communicationError");
  }
}

export async function retrieveLocation(locationId : String) {
  try {
    const {locations} = await act({ role: 'location', cmd: 'locationRetrieve', locationId });
    return locations;
  } catch (e) {
    throw new Error('locationNotExist');
  }
}

export async function retrieveLocations(locationNames: String[], tags: String[]){
  try{
    let index;
    let result:any[] = [];
    for(index = 0; index < locationNames.length; index++){
      const {locations} = await act({ role: 'location', cmd: 'locationRetrieve', query: {name: locationNames[index]} });
      locations.forEach(location => {
        result.push(location);
      });
    }
    const {locations} = await act({ role: 'location', cmd: 'locationRetrieve', query: {tags} });
    locations.forEach(location => {
      result.push(location);
    });
    return result;
  } catch (e) {
    return [];
  }
}

export async function retrieveLocationsByQuery(query : any) {
  let location;
  try {
    const {locations} = await act({ role: 'location', cmd: 'locationRetrieve', query });
    location = locations[0];
  } catch (e) {
    return location;
  }
  return location;

}

export async function retrieveLikes(photoId : String) {
  try {
    const { likes } = await act({ role: 'timeline', cmd: 'likeRetrieve', photoId });
    return likes.length;
  } catch (e) {
    return [];
  }
}

export async function retrieveComments(photoId : String) {
  try {
    const { comments } = await act({ role: 'timeline', cmd: 'commentRetrieve', photoId });
    return comments;
  } catch (e) {
    return [];
  }
}

export async function retrieveRating(userId : String, locationId : String, photoId : String) {
  try {
    const { ratings } =  await act({ role: 'location', cmd: 'ratingRetrieve', userId, locationId, photoId });
    return ratings[0].rating;
  } catch (e) {
    return null;
  }
}