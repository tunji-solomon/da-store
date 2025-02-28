const { ProductRepo }  = require('../repository/index');
const { uploadToCloudinary } = require('../utils/cloudinaryHelper')

class ProductService {

    getAll = async (req, res) => {

        const Products = await ProductRepo.getAllProduct()
        if(Products.length === 0)return res.status(400).json({
            status: 'Success',
            message: 'No product has been added yet'
        })

        const page = req.query.page || 1;
        const limit = req.query.limit || 2;
        const skip = ( page -1 ) * limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder =  req.query.sortOrder === 'asc'? 1 : -1;
        const totalProduct = Products.length;
        const totalPages = Math.ceil(totalProduct/limit);
        const sortObj = {}
        sortObj[sortBy] = sortOrder
        const productsPages = await ProductRepo.getAllProduct(sortObj,skip,limit)

        res.json({
            message: 'succesful',
            data: {
                products: productsPages,
                page: page,
                totalPages,
            }
        })
    }

    add = async (req, payload, res) => {

        if(payload.label){
            payload.label = payload.label.trim().charAt(0).toUpperCase() + payload.label.trim().slice(1)
        }
        const isProductExist =  await ProductRepo.findByParameterOne(payload.label)
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

        const { imgUrl, publicId } = await uploadToCloudinary(req.file.path, res)
        payload.imgUrl = imgUrl;
        payload.publicId = publicId

        const newProduct = await ProductRepo.addProduct(payload)
        res.json({
            message: 'Product added succesfully',
            data: newProduct
        })
    }

    find = async (payload, res) => {

        let getProducts;
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

    update = async (payload, res) => {

        let { label } = payload
        label = label.trim().charAt(0).toUpperCase() + label.trim().slice(1).toLowerCase()

        const productExist = await ProductRepo.findByParameterOne(label)
        if(!productExist) return res.json({
            message: `Item with label:${label} does not exist`
        })

        const updated = await ProductRepo.updateProduct(label,payload)
        if(!updated) return res.status(500).json({
            message: 'Update of item failed, pleaae try again'
        })

        return res.status(201).json({
            message: `Item with label:${label} updated succesfully`
        })
    }
}


module.exports = new ProductService()
