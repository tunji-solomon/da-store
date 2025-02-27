const joi = require('joi')
const productPayload =  require('../datasource/schema')

class ProductSchema {

    addProduct = (payload) => {
        
         let schema = joi.object({
            label: joi.string().min(2).max(30).label('Please enter name of product').required(),
            price: joi.number().label(`Price of item:${payload.label}, is required`).required(),
            quantity: joi.number().required().label(`Quantity of item:${payload.label} available, is required`)
        })

        return schema.validate(payload)
    }
}

module.exports = new ProductSchema()