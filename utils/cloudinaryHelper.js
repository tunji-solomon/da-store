const cloudinary = require('../config/cloudinary')
const { logger } = require('./tools')

const uploadToCloudinary = async (filePath, res) => {

    try {
        const result = await cloudinary.uploader.upload(filePath)
        return {
            imgUrl : result.secure_url,
            publicId: result.public_id
        };    
    } catch (error) {
        logger(error, res)      
    }
}

module.exports = {
    uploadToCloudinary
}