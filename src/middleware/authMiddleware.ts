import { TokenExpiredError } from 'jsonwebtoken';
import * as tools from '../utils/tools'
import { BlacklistModel } from '../datasource/model'
import { Request, Response, NextFunction } from 'express';



export const verifyToken = async (req : any, res : any, next : NextFunction) => {
    try {
        const token : any = tools.checkToken(req)
        if(!token){
            return res.json({
                message: "Token not present in the header"
            })
        };
        res.locals.user  = tools.verifyToken(token);
        next();
        
    } catch (error : any) {
        console.log(error.message)
        if(error instanceof TokenExpiredError){
            return res.json({
                message: "Token expired",
                badToken: true
            })
        }
        return res.json({
            message: "Authorization denied. Invalid token or Bad token in header"
        })   
    }

}

export const isLoggedOut = async (req : any, res : any, next : NextFunction) => {
    const token : any = tools.checkToken(req)
    if(!token) return res.json({
        message: "Authorization denied. No token in header."
    })
    const isBlacklisted : any = await BlacklistModel.findOne({token : token})
    if (isBlacklisted)return res.json({
        message: 'Authorization denied, Log in to continue'
    })

    res.locals.token = token

    next()
}

export const isAdmin = async (req : any, res : any, next : NextFunction) => {
    const { role } : any = res.locals.user;
    if(role !== 'admin'){
        return res.status(400).json({
            message : "Cant acces this page. only an admin user can."
        })
    }
    next()
}



