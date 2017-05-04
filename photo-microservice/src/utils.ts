import * as senecaClass from 'seneca';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

export const seneca = senecaClass();
export const act : any = Bluebird.promisify(seneca.act, {context: seneca});

// method to check if a location is valid
export async function isValidLocation(locationId : String) {
  try {
    // try to retrieve from backend the location
    await act({role: 'location', cmd: 'locationRetrieve', locationId});
  } catch (e) {
    throw new Error('locationNotExist');
  }
}

// method to check if the user is valid
export async function isValidUser(userId : String) {
  try {
    // try to retrieve from backend the user
    await act({ role: 'auth', cmd: 'userRetrieve', userId });
  } catch(e) {
    throw e;
  }
}

// method to check if a URL is valid
export function isValidURL(url: String) {
  if (!_.isString(url)) { // probably too naive: just check if it is a string
    throw new Error('urlInvalid');
  }
}

// method to check if a description is valid
export function isValidDescription(description : String) {
  if (!_.isString(description)) {
    throw new Error('invalidDescription');
  }
}

// method to retrieve user object from auth microservice by userId
export async function retrieveUser(userId : String) {
  try {
    // retrieve user object from auth microservice by userId
    return await act({ role: 'auth', cmd: 'userRetrieve', userId }); 
  } catch(e) {
    throw e;
  }
}

// method to (retrieve user object from auth microservice by list of user names)
export async function retrieveUsersByNames(usernames : String[]) {
  try {
    // formulate the query object
    let query:any = {};
    query.username = {};
    query.username.$in = usernames;
    // retrieve user object from auth microservice by list of user names
    return await act({ role: 'auth', cmd: 'userRetrieve', query });
  } catch(e) {
    console.log("communicationError");
  }
}

// method to retrieve location from location microservice() by locationId
export async function retrieveLocation(locationId : String) {
  try {
    // retrieve location from location microservice by locationId
    const {locations} = await act({ role: 'location', cmd: 'locationRetrieve', locationId });
    return locations;
  } catch (e) {
    throw new Error('locationNotExist');
  }
}

// method to retrieve list of location from location microservice by locationNames or tags
export async function retrieveLocations(locationNames: String[], tags: String[]) {
  try {
    let index;
    let result:any[] = [];
    // retrieve the location object by location name from location microservice one by one
    for(index = 0; index < locationNames.length; index++) {
      const {locations} = await act({ role: 'location', cmd: 'locationRetrieve', query: {name: locationNames[index]} });
      locations.forEach(location => {
        result.push(location);
      });
    }
    // retrieve the location object by location tags() from location microservice one by one
    const {locations} = await act({ role: 'location', cmd: 'locationRetrieve', query: {tags} });
    locations.forEach(location => {
      result.push(location);
    });
    return result;
  } catch (e) {
    return [];
  }
}

// method to retrieve the location object by query object from location microservice one by one
export async function retrieveLocationsByQuery(query : any) {
  let location;
  try {
    // retrieve the location object by query object from location microservice one by one
    const {locations} = await act({ role: 'location', cmd: 'locationRetrieve', query });
    location = locations[0];
  } catch (e) {
    return location;
  }
  return location;

}

// method to retrieve the like count by photoId from timeline microservice
export async function retrieveLikes(photoId : String) {
  try {
    const { likes } = await act({ role: 'timeline', cmd: 'likeRetrieve', photoId });
    return likes.length;
  } catch (e) {
    return [];
  }
}

// method to retrieve the all comments from timeline microservice
export async function retrieveComments(photoId : String) {
  try {
    const { comments } = await act({ role: 'timeline', cmd: 'commentRetrieve', photoId });
    return comments;
  } catch (e) {
    return [];
  }
}

// method to retrieve the all ratings from location microservice
export async function retrieveRating(userId : String, locationId : String, photoId : String) {
  try {
    const { ratings } =  await act({ role: 'location', cmd: 'ratingRetrieve', userId, locationId, photoId });
    return ratings[0].rating;
  } catch (e) {
    return null;
  }
}