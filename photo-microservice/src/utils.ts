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
        throw new Error('URLNotExist');
    }
}

export function isValidDescription(description: String){
    if (typeof description == 'undefined'){
        throw new Error('DescriptionNotExist');
    }
}