const replaceCloudinaryObjectIntoUrlInObject= (object, cloudinaryFields) => {
    let temObject = {};
    cloudinaryFields.map((fieldName)=>{
        temObject[fieldName] = object[fieldName].secure_url;

        // console.log("checking = ", object[fieldName].secure_url);
    })

    console.log("temObject = ", temObject);
    // console.log("temObject = ", {...object, ...temObject});
    return {...object, ...temObject};
};

const replaceCloudinaryObjectIntoUrlInArray = (array, cloudinaryFields)=>{
   let result =  array.map((singleObject)=>{
        return replaceCloudinaryObjectIntoUrlInObject(singleObject, cloudinaryFields)
    })

    // console.log("result = ", result)
    
    return result;

}


module.exports = { replaceCloudinaryObjectIntoUrlInObject, replaceCloudinaryObjectIntoUrlInArray };