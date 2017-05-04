import * as senecaClass from 'seneca';
import * as Bluebird from 'bluebird';
import * as _ from 'lodash';

export const seneca = senecaClass();
export const act : any = Bluebird.promisify(seneca.act, {context: seneca});

// check if a location name is valid
export function checkName(name : string, optional : boolean) {
  if (typeof name == 'undefined') {
    if (!optional) {
      throw new Error('invalidNameError');
    }
    return false;
  } else if (typeof name != 'string' || name.trim().length == 0) {
    throw new Error('invalidNameError');
  }
  return true;
}

// check if a location description is valid
export function checkDescription(description : string, optional : boolean) {
  if (typeof description == 'undefined') {
    if (!optional) {
      throw new Error('invalidDescriptionError');
    }
    return false;
  } else if (typeof description != 'string' || description.trim().length == 0) {
    throw new Error('invalidDescriptionError');
  }
  return true;
}

// check if location tags are valid
export function checkTags(tags : string[], optional : boolean) {
  if (typeof tags == 'undefined' || !(tags instanceof Array)) {
    if (!optional) {
      throw new Error('invalidTagsError');
    }
    return false;
  } else {
    tags
      .forEach(function (item) {
        if (typeof item != 'string' || item.trim().length == 0) {
          throw new Error('invalidTagsError');
        }
      });
  }
  return true;
}

// check if a location coordinate is valid
export function checkCoordinates(coordinates : {}, optional : boolean) {
  if (typeof coordinates === 'undefined') {
    if (!optional) {
      throw new Error('invalidCoordinatesError');
    }
    return false;
  } else {
    if (typeof coordinates['lat'] === 'undefined' || typeof coordinates['lng'] === 'undefined') {
      throw new Error('invalidCoordinatesError');
    }
    if (coordinates['lng'] < -180 || coordinates['lng'] > 180 || coordinates['lat'] < -90 || coordinates['lat'] > 90) {
      throw new Error('invalidCoordinatesError');
    }
  }
  return true;
}

// check if a user is valid by calling auth microservice to retrieve the user
export async function checkUser(userId : String, optional : boolean) {
  let res;

  if (!_.isString(userId)) {
    if (!optional) {
      throw new Error("userNotExist");
    }
    return false;
  }
  try {
    res = await act({ role: 'auth', cmd: 'userRetrieve', userId}); // call auth-microservice to retrieve the user
  } catch(e) {
    throw new Error("userNotExist");
  }

  return true;
}

// check if a photoId is really valid and does the photo really exists by calling photo-microservice to retrieve the photo
export async function checkPhoto(photoId: String, optional) {
  let res;
  if (!_.isString(photoId)) {
    if (!optional) {
      throw new Error("photoNotExist");
    }
    return false;
  }
  try {
    res = await act({ role:'photo', cmd: 'photoRetrieve', photoId }); // call photo-microservice to retrieve the photo
  } catch(e) {
    throw new Error("photoNotExist");
  }
  return true;
}

// get photoCount of a location by calling photo-microservice to retrieve the photo
export async function getPhotoCount(locationId: String) {
  try {
    const { photos } = await act({ role: 'photo', cmd: 'photoRetrieve', locationId });
    return photos.length;
  } catch(e) {
    return 0;
  }
}

// get list of photo count for a list of locationIds by calling photo-microservice to retrieve the photo stats.
export async function getPhotoCounts(locationIds: String[]) {
  try {
    const { stats } = await act({ role: 'photo', cmd: 'photoLocationStat', locationIds });
    return stats;
  } catch(e) {
    throw new Error("communicationError");
  }
}

// get list of photoIds liked by the users by calling the timeline-microservice to retrieve the likes.
export async function getLikedPhotoIds(userId: String) {
  try {
    const { likes } = await act({ role: 'timeline', cmd: 'likeRetrieve', userId });
    let result:string[] = [];
    likes.forEach(like => result.push(like.photoId));
    return result;
  } catch(e) {
    throw new Error("communicationError");
  }
}

// get lists of locations associated with a list of photoIds by calling the photo-microservice to retrieve the photo location id.
export async function getPhotosLocations(photoIds: String[]) {
  try {
    const { locationIds } = await act({ role: 'photo', cmd: 'photoRetrieveLocationIds', photoIds });
    let result:string[] = [];
    locationIds.forEach(locationId => result.push(locationId._id));
    return result;
  } catch(e) {
    throw new Error("communicationError");
  }
}