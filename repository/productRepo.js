const { productModel } = require('../datasource/model')

class ProductRepo {
    
    getAllProduct = async (sort,skip,limit) => {
        return await productModel.find().sort(sort).skip(skip).limit(limit)
    }
    
    findProductById =  async (id) => {
        try {
            const product = await productModel.findById(id).select("-__v -createdAt -quantity")
            return product
        } catch (error) {
            return null
        }
    }
    
    findByParameterOne = async (parameter) => {
        return await productModel.findOne({
            label: parameter
        })
    }
    
    findByParameterMany = async (parameter) => {
        // return await productModel.aggregate([
        //     {
        //         $match : {
        //             label : parameter.label,
        //             price: {$lte : parameter.price},
        //             isAvailable : parameter.isAvailable
        //         }
        //     }
        // ])
        if(parameter.label && parameter.price && parameter.isAvailable){
            return await productModel.find({
                $and: [
                    {
                label: parameter.label,
                price: { $lte : parameter.price},
                isAvailable : parameter.isAvailable
                    }
                
            ]})
        }
        if(parameter.label && parameter.price){
            return await productModel.find(
    
                {$and : [
                    { label: parameter.label },
                    { price:{ $lte : parameter.price} }
                ]}
            )
        }
    
        if(parameter.label && parameter.isAvailable){
            return await productModel.find(
    
                {$and : [
                    { label: parameter.label },
                    { isAvailable: parameter.isAvailable }
                ]}
            )
        }
    
        if(parameter.price && parameter.isAvailable){
            return await productModel.find(
    
                {$and : [
                    { price:{ $lte : parameter.price} },
                    { isAvailable: parameter.isAvailable }
                ]}
            )
        }
        if(parameter.label || parameter.price || parameter.isAvailable){
            return await productModel.find(    
                {$or : [
                    { label: parameter.label || null },
                    { price:{ $lte : parameter.price || null}  },
                    { isAvailable: parameter.isAvailable || null }
                ]}
            )
        }
    
    }
    
    addProduct =  async (payload) => {
        return await productModel.create(payload)
    }
    
    updateProduct =  async(parameter,payload) => {
        return await productModel.updateOne({label:parameter},{
            price: payload?.price,
            quantity: payload?.quantity,
            isAvailable: payload?.isAvailable
        })
    }

    checkAvailability =  async(parameter) => {
        const checkAvailability = await productModel.find({label:parameter})
        if(checkAvailability?.quantity < 1){
            await productModel.findByIdAndUpdate(checkAvailability?.id,
                {isAvailable : false}
            )
            return false
        }
        return true
    }

    delete = async (id) => {
        return await productModel.findByIdAndDelete(id)
    }

}



module.exports = new ProductRepo ()