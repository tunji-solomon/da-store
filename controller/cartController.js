const cartService = require('../services/cartService');
const { CartService } = require('../services/index');
const { logger } = require('../utils/tools');

class CartController {

    addToCart = async (req, res) => {

        try {
            const addProduct =  await CartService.addProduct(req.query, res)
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
            const removedItem = await cartService.removeItem(req.query, res)
            return removedItem   
        } catch (error) {
            logger(error, res)                  
        }
    }

    deleteCart = async (req, res) => {
        try {
            const delCart = await cartService.deleteCart(res);
            return delCart
        } catch (error) {
            logger(error, res)
        }
    }
}

module.exports = new CartController()