import mongoose from "mongoose"
import { productSchema, userSchema, cartSchema, blackListSchema } from './schema'

const productModel = mongoose.model('Product', productSchema)
const userModel = mongoose.model('user', userSchema)
const cartModel = mongoose.model('cart', cartSchema)
const BlacklistModel = mongoose.model('blackList', blackListSchema)

export {
    productModel,
    userModel,
    cartModel,
    BlacklistModel
}