const productService = require('../services/productService');
const { ProductSchema } = require('../schema/index');
const { logger } = require('../utils/tools')
const fs = require('fs')


class ProductController {

    getAll = async (req, res) => {

        try {
    
            const products = await productService.getAll(req,res)
            return products
        } catch (error) {
            logger(error, res)    
        }
    }

    add = async (req, res) => {

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
            const addProduct =  await productService.add(req, req.body, res)

            return addProduct
        } catch (error) {
            logger(error, res)  
        }
    }

    find = async (req, res ) => {
        
        try {
            const foundProduct = await productService.find(req.query, res)
            return foundProduct
        } catch (error) {
            logger(error, res)
        }
    }

    update = async (req, res) => {

        try {
            const { error } = ProductSchema.addProduct(req.body)
            if(error){
                return res.json({
                    status: false,
                    message: error?.details[0].context?.label})
            }
            const updatedProduct =  await productService.update(req.body, res)
            return updatedProduct
        } catch (error) {
            logger(error, res)  
        }
    }

    delete = async (req, res) => {
        
        try {
            const deletedProduct = await productService.delete(req.params, res)
            return deletedProduct
            
        } catch (error) {
            logger(error, res)
            
        }
    }
}

module.exports = new ProductController()