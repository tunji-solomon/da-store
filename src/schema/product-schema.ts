import Joi from "joi"

class ProductSchema {

    addProduct = (payload : any) => {
        
         let schema : Joi.ObjectSchema = Joi.object({
            label: Joi.string().min(2).max(30).label('Please enter name of product').required(),
            price: Joi.number().label(`Price of item:${payload.label}, is required`).required(),
            quantity: Joi.number().required().label(`Quantity of item:${payload.label} available, is required`)
        })

        return schema.validate(payload)
    }
}

export default new ProductSchema()