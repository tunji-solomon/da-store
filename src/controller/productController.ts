import{ ProductService } from '../services';
import ProductSchema from '../schema/product-schema'
import { Response, Request } from 'express-serve-static-core';
import { logger } from '../utils/tools';


class ProductController {

    getAll = async (req : Request, res : Response) => {
        try {
            const products : any = await ProductService.getAll(req,res)
            return products
        } catch (error) {
            logger(error, res)    
        }
    }

    add = async (req : any, res : Response) => {

        try {
            if(!req.file) return res.status(400).json({
                status: 'Failed',
                message: 'File missing, Please upload a file and try again.'
            })

            // const { error } =  ProductSchema.addProduct(req.body)
            // if(error){
            //     return res.json({
            //         status: false,
            //         message: error?.details[0].context?.label})
            // }
            const addProduct : any =  await ProductService.add(req, req.body, res)

            return addProduct
        } catch (error) {
            logger(error, res)  
        }
    }

    find = async (req : Request, res : Response ) => {
        
        try {
            const foundProduct : any = await ProductService.find(req.query, res)
            return foundProduct
        } catch (error) {
            logger(error, res)
        }
    }

    update = async (req : Request, res : Response) => {

        try {
            const { error } = ProductSchema.addProduct(req.body)
            if(error){
                return res.json({
                    status: false,
                    message: error?.details[0].context?.label})
            }
            const updatedProduct : any =  await ProductService.update(req.body, res)
            return updatedProduct
        } catch (error) {
            logger(error, res)  
        }
    }

    delete = async (req : Request, res : Response) => {
        
        try {
            const deletedProduct : any = await ProductService.delete(req.params, res)
            return deletedProduct
            
        } catch (error) {
            logger(error, res)
            
        }
    }
}

export default new ProductController()