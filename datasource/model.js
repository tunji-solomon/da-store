const  mongoose  = require('mongoose')
const { productSchema, userSchema, cartSchema } = require('./schema')

const productModel = mongoose.model('Product', productSchema)
const userModel = mongoose.model('user', userSchema)
const cartModel = mongoose.model('cart', cartSchema)

module.exports = {
    productModel,
    userModel,
    cartModel
}