const { TokenExpiredError } = require('jsonwebtoken')
const tools = require('../utils/tools')

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

module.exports = {
    verifyToken
}