/* eslint-disable no-underscore-dangle */
const replaceMongoIdInArray = (array) => {
    const mappedArray = array
        .map((item) => ({
            id: item._id.toString(),
            ...item,
        }))
        .map(({ _id, ...rest }) => rest);

    return mappedArray;
};

const replaceMongoIdInObject = (obj) => {
    const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
    return updatedObj;
};

module.exports = { replaceMongoIdInArray, replaceMongoIdInObject };
