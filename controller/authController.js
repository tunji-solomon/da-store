const { AuthService } =  require('../services/index')
const { logger } = require('../utils/tools')

class AuthController {

    createUser = async (req, res) => {

        try {
            const newUser = await AuthService.create(req.body, res)
            return newUser  
        } catch (error) {
            logger(error, res)          
        }
    }

    getAllUsers = async (req,res) => {
        
        try {
            const users = await AuthService.getAllUser(res)
            return users
        } catch (error) {
            logger(error, res)           
        }
    }

    login = async (req, res) => {

        try {
            const user = await AuthService.login(req.body,res)
            return user
        } catch (error) {
            logger(error, res)           
        }
    }

    logout = async (req, res) => {

        try {
            const user = await AuthService.logout(res)
            return user
        } catch (error) {
            logger(error, res)           
        }
    }
}

module.exports = new AuthController()