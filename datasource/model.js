const  mongoose  = require('mongoose')
const { productSchema, userSchema, cartSchema, blackListSchema } = require('./schema')

const productModel = mongoose.model('Product', productSchema)
const userModel = mongoose.model('user', userSchema)
const cartModel = mongoose.model('cart', cartSchema)
const BlacklistModel = mongoose.model('blackList', blackListSchema)

module.exports = {
    productModel,
    userModel,
    cartModel,
    BlacklistModel
}