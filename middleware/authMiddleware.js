const { TokenExpiredError } = require('jsonwebtoken')
const tools = require('../utils/tools')
const { BlacklistModel } = require('../datasource/model')

const verifyToken = async (req, res, next) => {


    try {
        const token = tools.checkToken(req)
        if(!token){
            return res.json({
                message: "Token not present in the header"
            })
        };
        res.locals.user = tools.verifyToken(token);
        next();
        
    } catch (error) {
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

const isLoggedOut = async (req, res, next) => {
    const token = tools.checkToken(req)
    if(!token) return res.json({
        message: "Authorization denied. No token in header."
    })
    const isBlacklisted = await BlacklistModel.findOne({token : token})
    if (isBlacklisted)return res.json({
        message: 'Authorization denied, Log in to continue'
    })

    res.locals.token = token

    next()
}

const isAdmin = async (req, res, next) => {
    const { role } = res.locals.user;
    if(role !== 'admin'){
        return res.status(400).json({
            message : "Cant acces this page. only an admin user can."
        })
    }

    next()

}

module.exports = {
    verifyToken,
    isLoggedOut,
    isAdmin
}