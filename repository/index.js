const { productModel } = require('../datasource/model')

const newProduct = async (payload) => {
    return await productModel.create(payload)
}

const getAllProduct = async () => {
    return await productModel.find()
}

const findProductById =  async (id) => {
    return await productModel.findById(id)
}

const findByParameter = async (parameter) => {
    return await productModel.findOne({
        label: parameter
    })
}

const addProduct =  async (payload) => {
    return await productModel.create(payload)
}

const updateProduct =  async(parameter,payload) => {
    return await productModel.updateOne({label:parameter},{
        price: payload.price,
        quantity: payload.quantity,
        isAvailable: payload?.isAvailable
    })
}

module.exports = {
    newProduct,
    getAllProduct,
    findProductById,
    findByParameter,
    addProduct, 
    updateProduct
}