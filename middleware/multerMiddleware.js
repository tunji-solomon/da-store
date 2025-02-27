const multer = require('multer');
const path = require('path')
const fs = require('fs')


const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        cb(null, 
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    }
})


const isImage = (req, file, cb) => {

    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new Error('File type must be an image'))
    }
}

const limit = {
    fileSize : 5 * 1024 * 1024 //5mb
}

module.exports = multer({
    storage: storage,
    fileFilter: isImage,
    limits: limit.fileSize
})