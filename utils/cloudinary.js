const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error('Provide Valid localFilePath');
        }
        const response = await cloudinary.uploader.upload(localFilePath);

        
        fs.unlink(localFilePath, (error) => {
            if(error){
                console.log('uploadOnCloudinary, fsmodule error = ', error);
            }
        });
        return response;
    } catch (error) {
        //  console.log('error = ', error);
        if (localFilePath) {
            fs.unlink(localFilePath, (error) => {
                if(error){
                    console.log('uploadOnCloudinary, fsmodule error = ', error);
                }
            });

            // fs.unlink(localFilePath);
        }
            return null;
    }
};


module.exports = {uploadOnCloudinary};