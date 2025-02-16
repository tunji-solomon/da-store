const { mongoose } = require('../datasource/db')
const { productSchema } = require('./schema')

const productModel = mongoose.model('Product', productSchema)

module.exports = {productModel}