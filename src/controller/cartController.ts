import { CartService } from '../services';
import { logger } from '../utils/tools';
import { Request, Response } from 'express';

class CartController {

    addToCart = async (req : Request, res : Response) => {

        try {
            const addProduct : any =  await CartService.addProduct(req.query, res)
            return addProduct; 
        } catch (error) {
            logger(error, res)          
        }
    }
    
    viewCart = async (req : Request, res : Response) => {

        try {
            const cart : any = await CartService.viewItems(res)
            return cart
        } catch (error) {
            logger(error, res)              
        }
    }

    removeItem = async (req : Request, res : Response) => {

        try {
            const removedItem : any = await CartService.removeItem(req.query, res)
            return removedItem   
        } catch (error) {
            logger(error, res)                  
        }
    }

    deleteCart = async (req : Request, res : Response) => {
        try {
            const delCart : any = await CartService.deleteCart(res);
            return delCart
        } catch (error) {
            logger(error, res)
        }
    }
}

export default new CartController()