import { productModel } from '../datasource/model'
class ProductRepo {
    
    getAllProduct = async () => {
        return await productModel.find();
    }

    AllProduct = async (sort : string,skip : number ,limit : number) => {
        return await productModel.find().sort(sort).skip(skip).limit(limit)
    }
    
    findProductById =  async (id : string) => {
        try {
            const product : any = await productModel.findById(id).select("-__v -createdAt -quantity")
            return product
        } catch (error) {
            return null
        }
    }
    
    findByParameterOne = async (parameter : string) => {
        return await productModel.findOne({
            label: parameter
        })
    }
    
    findByParameterMany = async (parameter : any) => {
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
    
    addProduct =  async (payload : any) => {
        return await productModel.create(payload)
    }
    
    updateProduct =  async(parameter : string, payload : any) => {
        return await productModel.updateOne({label:parameter},{
            price: payload?.price,
            quantity: payload?.quantity,
            isAvailable: payload?.isAvailable
        })
    }

    checkAvailability =  async(parameter : string) => {
        const checkAvailability : any = await productModel.find({label:parameter})
        if(checkAvailability?.quantity < 1){
            await productModel.findByIdAndUpdate(checkAvailability?.id,
                {isAvailable : false}
            )
            return false
        }
        return true
    }

    delete = async (id : string) => {
        return await productModel.findByIdAndDelete(id)
    }

}



export default new ProductRepo ()