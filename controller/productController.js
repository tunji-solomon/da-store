const productService = require('../services/productService')

class ProductController {

    getAll = async (req, res) => {
        try {
            const products = await productService.getAll(res)
            return products

        } catch (error) {
            res.json({
                message: error.message
            })
               
        }
    }

    add = async (req, res) => {
        try {
            const addProduct =  await productService.add(req.body, res)
            return addProduct
            
        } catch (error) {
            res.json({
                status: 'failed',
                message: error.message
            })
            
        }
    }
}

module.exports = new ProductController()