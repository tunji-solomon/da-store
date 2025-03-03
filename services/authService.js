const { BlacklistModel } = require('../datasource/model')
const { AuthRepo } = require('../repository/index')
const tools = require('../utils/tools')

class UserService {

    create = async (payload, res) => {

        const { email, username, password } = payload

        if(!email && !username && !password){

             return res.json({message: 'All fields must be provided'})
        }

        const emailExist = await AuthRepo.findByParameter(email)
        if(emailExist) {
            return res.status(404).json({
            status: 'Failed',
            message: 'User with email already exist, Please try with a different email'
            
            })
        }

        const usernameExist = await AuthRepo.findByParameter(username)
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

    getAllUser = async (res) => {

        const users = await AuthRepo.getAllUser()
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

    login = async (payload, res) => {

        const { username, password } = payload;

        const userExist = await AuthRepo.findByParameter(username)
        if(!userExist){
            return res.json({
                message: 'User with username does not exist'
            })
        }

        const getHashed =  await AuthRepo.getPassword(username)
        const comparePasswod = await tools.comparePassword(getHashed?.password, password)
        if(!comparePasswod){
            return res.json({
                message: "Invalid Credentials. please provide the correct password"
            })
        }

        const setActive = { isActive : true }
        await AuthRepo.update(userExist?.id, setActive)

        const token = tools.generateToken(
            {
                username: userExist?.username,
                userId : userExist?.id
            },
            "1hr"    
        )

        return res.status(200).json({
            message: "Login successful",
            user: userExist,
            token
        })
    }

    logout = async (res) => {
        const { token } = res.locals

        await AuthRepo.logout(token)
        return res.status(201).json({
            status: 'success',
            message: 'User logged out succefully'
        })
    }
}

module.exports = new UserService()