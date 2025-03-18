import { cloudinary } from '../config/cloudinary'
import { Response } from 'express'
import { logger } from '../utils/tools'

const uploadToCloudinary = async (filePath : any, res : Response) => {

    try {
        const result : any = await cloudinary.uploader.upload(filePath)
        return {
            imgUrl : result.secure_url,
            publicId: result.public_id
        };    
    } catch (error : any) {
        logger(error, res)      
    }
}

const deleteCloudinary = async (public_id : string, res : Response) => {

    try {

        const result : any = await cloudinary.uploader.destroy(public_id);
        return result
        
    } catch (error : any) {
        logger(error, res)
        
    }
}

export {
    uploadToCloudinary,
    deleteCloudinary
}