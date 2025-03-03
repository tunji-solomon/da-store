const { userModel, BlacklistModel } = require('../datasource/model')

class AuthRepo {
    
    create = async (payload) => {
        return await userModel.create(payload)
    }

    findUserById = async (id) => {
        return await userModel.findById(id).select("-password -__v")
    }

    findByParameter = async (parameter) => {
        return await userModel.findOne({
            $or : [
                {email : parameter},
                {username: parameter}
            ]
        }).select("-password  -__v -updatedAt")
    }

    getPassword = async (parameter) => {
        return await userModel.findOne(
            {username: parameter}
        )
    }

    getAllUser = async () => {
        return await userModel.find().select("-password -isActive -__v")
    }

    update = async (id, payload) => {
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

    logout = async (payload) => {
        return await BlacklistModel.create({token : payload})
    }
}

module.exports = new AuthRepo()

