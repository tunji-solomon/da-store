const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashPassword  = async (password) => {
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(password, salt)
}

const comparePassword = async (hashedpassword,plainpassword) => {
    return await bcrypt.compare(plainpassword, hashedpassword)
}

const generateToken = (payload, time) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn : time})
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}

const checkToken = (req) => {
    
    if(req.headers?.authorization && 
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1]
    }
        return null
}

const logger = (error, res) => {
    console.log(`SERVER ERROR: `,error)
    return res.status(500).json({
        status: 'failed',
        message: 'something went wrong, Try again later'
    })  
}

const clearToken = (req) => {
    let header = req.headers?.authorization.split(' ')[1]
    if(header !== null){
        header = null
        return header
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
    checkToken,
    logger,
    clearToken
}