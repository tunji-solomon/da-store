const cartService = require('../services/cartService');
const { CartService } = require('../services/index');
const { logger } = require('../utils/tools');

class CartController {

    addToCart = async (req, res) => {

        try {
            const addProduct =  await CartService.addProduct(req.params, res)
            return addProduct; 
        } catch (error) {
            logger(error, res)          
        }
    }
    
    viewCart = async (req, res) => {

        try {
            const cart = await cartService.viewItems(res)
            return cart
        } catch (error) {
            logger(error, res)              
        }
    }

    removeItem = async (req, res) => {

        try {
            const removedItem = await cartService.removeItem(req.params, res)
            return removedItem   
        } catch (error) {
            logger(error, res)                  
        }
    }
}

module.exports = new CartController()