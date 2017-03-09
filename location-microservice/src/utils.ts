import * as senecaClass from 'seneca';

export const seneca = senecaClass();

export function checkName(name:string, optional:boolean){
    if(typeof name == "undefined"){
        if(!optional){
            throw new Error("invalidNameError");
        }
        return false;  
    }else if(typeof name != "string" || name.trim().length == 0){
        throw new Error("invalidNameError");
    }
    return true;
}
export function checkDescription(description:string, optional:boolean){
    if(typeof description == "undefined"){
        if(!optional){
            throw new Error("invalidDescriptionError");
        }   
        return false;
    }else if(typeof description != "string" || description.trim().length == 0){
        throw new Error("invalidDescriptionError");
    }
    return true;
}
export function checkTags(tags:string[], optional:boolean){
    if(typeof tags == "undefined" || !(tags instanceof Array)){
        if(!optional){
            throw new Error("invalidTagsError");
        }  
        return false; 
    }else{
        tags.forEach(function(item){
            if(typeof item != "string" || item.trim().length == 0){
                throw new Error("invalidTagsError");
            }
        });
    }
    return true;
}

export function checkCoordinates(coordinates: {}, optional:boolean){
    if(typeof coordinates === "undefined"){
        if(!optional){
            throw new Error("invalidCoordinatesError");
        }
        return false;
    }else{
        if(typeof coordinates["lat"] === "undefined" || typeof coordinates["lng"] === "undefined"){
            throw new Error("invalidCoordinatesError");
        }
        if(coordinates["lng"] < -180 || coordinates["lng"] > 180 || coordinates["lat"] < -90 || coordinates["lat"] > 90){
            throw new Error("invalidCoordinatesError");
        }
    }
    return true;
}