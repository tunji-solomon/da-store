import { AuthService } from '../services';
import { logger } from '../utils/tools';
import { Request, Response } from 'express';
import Authschema from '../schema/auth-schema'

class AuthController {

    createUser = async (req : Request, res : Response) => {
        try {

            const {error} = Authschema.register(req.body)
            if (error){
                return res.status(400).json({
                    status : 'Failed',
                    message : error.details[0].context?.label === 'confirm'
                                ? 'Password and confirm password mismatch'
                                : error.details[0].context?.label
                })
            }
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

            const { error } = Authschema.login(req.body)
            if(error){
                return res.status(400).json({
                    status : 'Failed',
                    message : error.details[0].context?.label
                })
            }
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