const { ProductRepo, CartRepo } =  require('../repository/index')

class CartService {

    addProduct = async (payload, res) => {
        const { id } = payload
        const { userId } = res.locals.user

        const getProduct =  await ProductRepo.findProductById(id)
        if(!getProduct){
            return res.status(404).json({
                status: "Failed",
                message: "Product with Id not found"
            })
        }
        let findIt;
        const product = {
            id:getProduct?.id,
            label: getProduct?.label,
            price: getProduct?.price,
            quantity: 1
        }

        delete payload.id
        payload.cart = product
        payload.total = product?.price 

        const existingCart = await CartRepo.findByParameterOne(userId);
        if(existingCart){
           const existingProduct = existingCart.cart.find(item => item.id === product.id)
            if(existingProduct){
                existingProduct.quantity++;
                await CartRepo.updateOne(userId,existingProduct)
            }else{
                await CartRepo.addProduct(userId,payload)
            }
        }else{

            payload.userId = userId
            await CartRepo.addProduct(userId,payload);

        }

        const updatedCart = await CartRepo.findByParameterOne(userId)

        return res.status(200).json({
            status: "Success",
            message: "Product added to cart",
            cart: updatedCart
        })


    }

    viewItems = async (res) => {

        const { userId } = res.locals.user

        const existingCart = await CartRepo.findByParameterOne(userId)
        if(!existingCart){
            return res.status(404).json({
                status: "Failed",
                message: "User does not have any existing cart. add items now to create one"
            })
        }

        return res.status(200).json({
            status: "Success",
            message: "Cart records fetched successfully",
            cart: existingCart
        })
    }

    removeItem = async (payload, res) => {

        const { id } = payload;
        const { userId } = res.locals.user
        const productExist = await ProductRepo.findProductById(id)
        if(!productExist){
            return res.status(404).json({
                status: 'Failed',
                message: "Product not found"
            })

        }

        const getCart = await CartRepo.findByParameterOne(userId)
        if(!getCart){
            return res.status(404).json({
                status: 'Failed',
                message: 'User has not added any item yet'
            })
        }
        if(getCart?.cart.length === 0){
            return res.json({
                message: 'Cart is empty'
            })
        }
        const itemExist  = getCart.cart.find(item => item.id === productExist.id)
        if(!itemExist) return res.status(404).json({
            status: 'Failed',
            message: "Cart does not contain the given item"
        })

        await CartRepo.removeItem(userId,productExist)

        const updatedCart = await CartRepo.findByParameterOne(userId)
        return res.status(201).json({
            status: 'Success',
            message: 'Item removed from cart',
            cart: updatedCart

        })

    }
}

module.exports = new CartService()