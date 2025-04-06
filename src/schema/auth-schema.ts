import { UserPayload } from '../interface'
import Joi from 'joi'
class Authschema {
    static emailRegex = /^[^@ ]+@[^@.]+\.\w+$/
    static passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/

    register (payload : UserPayload) {
        const schema : Joi.ObjectSchema = Joi.object({
            username : Joi.string().required().label('username is required'),
            email : Joi.string().pattern(Authschema.emailRegex).required().label('Enter a valid email'),
            password: Joi.string().pattern(Authschema.passwordRegex).required().label('Enter a valid password'),
            confirm : Joi.ref('password')

            }).with('password', 'confirm')
        return schema.validate(payload)
    }

    login (payload : UserPayload) {
        const schema : Joi.ObjectSchema = Joi.object({
            username : Joi.string().label('Username is required').required(),
            password : Joi.string().label('Password is required').required()
        })

        return schema.validate(payload)
    }
}

export default new Authschema()

