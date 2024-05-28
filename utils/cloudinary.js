const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    // api_secret: process.env.API_SECRET,
    api_secret: 123,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error('Provide Valid localFilePath');
        }
        const response = await cloudinary.uploader.upload(localFilePath);
        return response;
    } catch (error) {
        if (localFilePath) {
            fs.unlink(localFilePath, (error) => {
                console.log('imagae gallery delete fsmodule error = ', error);
            });
        }
            // console.log('error = ', error);
            throw new Error(error);
    }
};


module.exports = {uploadOnCloudinary};