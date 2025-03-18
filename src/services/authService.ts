import { BlacklistModel } from '../datasource/model'
import { AuthRepo } from '../repository/index'
import * as tools from '../utils/tools'
import { Response } from 'express'

class UserService {

    create = async (payload : any, res : Response) => {

        const { email, username, password } = payload
        if(!email && !username && !password){
             return res.json({message: 'All fields must be provided'})
        }

        const emailExist : any = await AuthRepo.findByParameter(email)
        if(emailExist) {
            return res.status(404).json({
            status: 'Failed',
            message: 'User with email already exist, Please try with a different email'
            
            })
        }

        const usernameExist : any = await AuthRepo.findByParameter(username)
        if(usernameExist){
            return res.json({
                status: 'failed',
                message: "user with username already exist"
            })
        }

        // hash password
        payload.password = await tools.hashPassword(password)
        await AuthRepo.create(payload)

        res.status(201).json({
            message: 'User created successfully'
        })
    }

    getAllUser = async (res : Response) => {

        const users : any = await AuthRepo.getAllUser()
        if(users.length < 1) {
            return res.json({
                message: 'No registered user yet'
            })
        }
        res.status(200).json({
            message: 'List of users fetched successfully',
            data: {
                count: users?.length,
                users: users
            }
        })
    }

    login = async (payload : any, res : Response) => {

        const { username, password } = payload;
        const userExist : any = await AuthRepo.findByParameter(username)
        if(!userExist){
            return res.json({
                message: 'User with username does not exist'
            })
        }

        const getHashed : any =  await AuthRepo.getPassword(username)
        const comparePasswod : any = await tools.comparePassword(getHashed?.password, password)
        if(!comparePasswod){
            return res.json({
                message: "Invalid Credentials. please provide the correct password"
            })
        }

        const setActive : any  = { isActive : true }
        await AuthRepo.update(userExist?.id, setActive)

        const token : string = tools.generateToken(
            {
                username: userExist?.username,
                userId : userExist?.id,
                role : userExist.role
            },
            "1hr"    
        )

        return res.status(200).json({
            message: "Login successful",
            user: userExist,
            token
        })
    }

    logout = async (res : Response) => {
        const { token } = res.locals

        await AuthRepo.logout(token)
        return res.status(201).json({
            status: 'success',
            message: 'User logged out succefully'
        })
    }
}

export default new UserService()