import { ParsedUrlQuery } from 'querystring';
import { ProductRepo } from '../repository';
import { Response, Request } from 'express';
const { uploadToCloudinary, deleteCloudinary } = require('../utils/cloudinaryHelper')

class ProductService {

    getAll = async (req : Request, res : Response) => {

        const Products = await ProductRepo.getAllProduct()
        if(Products.length === 0)return res.status(400).json({
            status: 'Success',
            message: 'No product has been added yet'
        })

        const page : any = req.query.page || 1;
        const limit : any = req.query.limit || 2;
        const skip : number = ( page -1 ) * limit;

        const sortBy : any = req.query.sortBy || 'createdAt';
        const sortOrder : any =  req.query.sortOrder === 'asc'? 1 : -1;
        const totalProduct = Products.length;
        const totalPages : number = Math.ceil(totalProduct/limit);
        const sortObj : any = {}
        sortObj[sortBy] = sortOrder
        const productsPages : any = await ProductRepo.AllProduct(sortObj,skip,limit)

        res.json({
            message: 'succesful',
            data: {
                products: productsPages,
                page: page,
                totalPages,
            }
        })
    }

    add = async (req : any, payload : any, res : Response) => {

        if(payload.label){
            payload.label = payload.label.trim().charAt(0).toUpperCase() + payload.label.trim().slice(1)
        }
        const isProductExist : any =  await ProductRepo.findByParameterOne(payload.label)
        if(isProductExist){
            payload.quantity = Number(payload.quantity)
            payload.quantity += isProductExist?.quantity
            if(isProductExist.isAvailable === false){
                payload.quantity > 0 ? payload.isAvailable = true : false
            }
            
            await ProductRepo.updateProduct(payload.label,payload)
            return res.json({
                message: 'product updated successfully'
            })
        }

        // upload image to cloudinary
        const { imgUrl, publicId } = await uploadToCloudinary(req.file.path, res)
        payload.imgUrl = imgUrl;
        payload.publicId = publicId

        const newProduct = await ProductRepo.addProduct(payload)
        res.json({
            message: 'Product added succesfully',
            data: newProduct
        })
    }

    find = async (payload : any, res : Response) => {

        let getProducts : any;
        const { label, price, isAvailable } = payload

        if(!label && !price && !isAvailable) return res.json('No search value given. please enter your search')

        if(payload.label){
            payload.label = payload.label.trim().charAt(0).toUpperCase() + payload.label.trim().slice(1).toLowerCase()
        }

        getProducts = await ProductRepo.findByParameterMany(payload)
        if(getProducts.length < 1) return res.json(`Your search query does not have any match.`)

        return res.json({
            message: 'Items fetched successfully',
            data: getProducts
        })
    }

    update = async (payload : any, res : Response) => {

        let { label } = payload
        label = label.trim().charAt(0).toUpperCase() + label.trim().slice(1).toLowerCase()

        const productExist : any = await ProductRepo.findByParameterOne(label)
        if(!productExist) return res.json({
            message: `Item with label:${label} does not exist`
        })

        const updated : any = await ProductRepo.updateProduct(label,payload)
        if(!updated) return res.status(500).json({
            message: 'Update of item failed, pleaae try again'
        })

        return res.status(201).json({
            message: `Item with label:${label} updated succesfully`
        })
    }

    delete = async (payload : any, res : Response) => {
        const { id } = payload
        const isProductExist : any = await ProductRepo.findProductById(id)
        if (!isProductExist) return res.status(400).json({
            message : "Product with ID not found"
        })

        // delete from cloudinary
        const clodinaryResult : any = await deleteCloudinary(isProductExist?.publicId, res)
        if(!clodinaryResult) return res.status(500).json({
            message : 'Something went wrong. Try gain'
        })
        
        await ProductRepo.delete(id)
        return res.status(200).json({
            status : "Success",
            message : "Product deleted successfully"
        })

    }
}


export default new ProductService()
