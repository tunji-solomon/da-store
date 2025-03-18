import multer  from 'multer';
import path  from 'path';
import { Request } from 'express';



const storage = multer.diskStorage({

    destination: function(req : Request, file : any, cb){
        cb(null, 'uploads')
    },
    filename: function(req : Request, file : any, cb){
        cb(null, 
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    }
})


const isImage = (req : Request, file : any, cb : any) => {

    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new Error('File type must be an image'))
    }
}

const limit : any = {
    fileSize : 5 * 1024 * 1024 //5mb
}

export default multer({
    storage: storage,
    fileFilter: isImage,
    limits: limit.fileSize
})