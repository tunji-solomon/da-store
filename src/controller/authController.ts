import { AuthService } from '../services';
import { logger } from '../utils/tools';
import { Request, Response } from 'express';

class AuthController {

    createUser = async (req : Request, res : Response) => {
        try {
            const newUser : any = await AuthService.create(req.body, res)
            return newUser  
        } catch (error) {
            logger(error, res)          
        }
    }

    getAllUsers = async (req : Request, res : Response) => {
        try {
            const users : any = await AuthService.getAllUser(res)
            return users
        } catch (error) {
            logger(error, res)           
        }
    }

    login = async (req : Request, res : Response) => {
        try {
            const user : any = await AuthService.login(req.body,res)
            return user
        } catch (error) {
            logger(error, res)           
        }
    }

    logout = async (req : Request, res : Response) => {
        try {
            const user : any = await AuthService.logout(res)
            return user
        } catch (error) {
            logger(error, res)           
        }
    }
}

export default new AuthController()