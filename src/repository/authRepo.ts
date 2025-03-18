import { userModel, BlacklistModel } from '../datasource/model'

class AuthRepo {
    
    create = async (payload : any) => {
        return await userModel.create(payload)
    }

    findUserById = async (id : string) => {
        return await userModel.findById(id).select("-password -__v")
    }

    findByParameter = async (parameter : any) => {
        return await userModel.findOne({
            $or : [
                {email : parameter},
                {username: parameter}
            ]
        }).select("-password  -__v -updatedAt")
    }

    getPassword = async (parameter : string) => {
        return await userModel.findOne(
            {username: parameter}
        )
    }

    getAllUser = async () => {
        return await userModel.find().select("-password -isActive -__v")
    }

    update = async (id : string, payload : any) => {
        return await userModel.findByIdAndUpdate(id,
            {
                username: payload.username,
                email: payload.email,
                password: payload.password,
                balance: payload.amount,
                isActive: payload.isActive

            }
        ).select('username email balance')
    }

    logout = async (payload : string) => {
        return await BlacklistModel.create({token : payload})
    }
}

export default new AuthRepo()

