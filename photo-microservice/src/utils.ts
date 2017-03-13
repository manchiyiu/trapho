import * as senecaClass from 'seneca';
import * as Bluebird from 'bluebird';

export const seneca = senecaClass();
export const act: any = Bluebird.promisify(seneca.act, { context: seneca });


export async function isValidLocation(locationId: String){
    try{
        await act({ role: 'location', cmd: 'locationRetrieve', locationId});
    } catch(e) {
        throw e;
    }
}

export async function isValidUser(userId: String){
    // try{
    //     await act({ role: 'auth', cmd: 'userRetrieve', userId});
    // } catch(e) {
    //     throw e;
    // }
}

export function isValidURL(url: String){
    if (typeof url == 'undefined'){
        throw new Error('urlNotExist');
    }
    if (typeof url != 'string'){
        throw new Error('invalidURL');
    }
}

export function isValidDescription(description: String){
    if (typeof description == 'undefined'){
        throw new Error('descriptionNotExist');
    }
    if (typeof description != 'string'){
        throw new Error('invalidDescription');
    }
}