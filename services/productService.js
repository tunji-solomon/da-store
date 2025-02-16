const Product  = require('../repository/index')

class ProductService {

    getAll = async (res) => {

        const Products = await Product.getAllProduct()
        res.json({
            message: 'succesful',
            data: {
                count: Products.length,
                products: Products
            }
        })

    }

    add = async (payload, res) => {

        const isProductExist =  await Product.findByParameter(payload.label)
        if(isProductExist){
            payload.quantity += isProductExist?.quantity
            await Product.updateProduct(payload.label,payload)
            return res.json({
                message: 'product updated successfully'
            })
        }
    
        const newProduct = await Product.addProduct(payload)
        res.json({
    
            message: 'Product added succesfully',
            data: newProduct
        })

    }
}


module.exports = new ProductService()
