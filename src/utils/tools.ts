import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"

const hashPassword  = async (password : string) => {
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(password, salt)
}

const comparePassword = async (hashedpassword : string,plainpassword : string) => {
    return await bcrypt.compare(plainpassword, hashedpassword)
}

const generateToken = (payload : any, time : any) => {
    return jwt.sign(payload, String(process.env.SECRET_KEY), { expiresIn : time})
}

const verifyToken = (token : string) => {
    return jwt.verify(token, String(process.env.SECRET_KEY))
}

const checkToken = (req : any) => {
    
    if(req.headers?.authorization && 
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1]
    }
        return null
}

const logger = (error : any, res : Response) => {
    console.log(`SERVER ERROR: `,error)
    return res.status(500).json({
        status: 'failed',
        message: 'something went wrong, Try again later'
    })  
}


export {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
    checkToken,
    logger,
}