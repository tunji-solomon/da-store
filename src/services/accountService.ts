import { AuthRepo, CartRepo, ProductRepo } from '../repository';
import { Response } from 'express'

class AccountService {

    viewBalance = async (res : Response) => {

        const { userId } = res.locals.user
        const getUser : any = await AuthRepo.findUserById(userId)
        if(!getUser){
            return res.status(500).json({
                status: "failed",
                message: "User with Id not found"
            })
        }

        res.status(200).json({
            status: "Success",
            message: "User balance fetched successfully",
            balance: getUser?.balance
        })

    }

    addFund = async (payload : any, res : Response) => {

        const { userId } = res.locals.user;
        const { amount } = payload
        const user = await AuthRepo.findUserById(userId)
        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }
        
        payload.amount = amount + user?.balance
        const updatedUser = await AuthRepo.update(userId, payload)

        return res.status(201).json({
            status: " Success",
            message: "succesfully top up balance",
            update: updatedUser
        })

    }

    checkout = async (res : Response) => {

        const { userId } = res.locals.user;
        let payload : any = {};

        const getCart = await CartRepo.findByParameterOne(userId)
        if(!getCart) return res.status(404).json({
            status: 'Failed',
            message: 'User hasnt added any item to cart yet'
        })

        const getProduct : any = await ProductRepo.getAllProduct()
        const check = getProduct.find((product : any) => {
            for(let i = 0; i < getCart?.cart.length; i++){
                if(product.id === getCart.cart[i].id){
                    if(product.isAvailable === false){
                        return res.status(400).json({
                            status: 'Failed',
                            message: `Item: ${product.label} out of stock now, try some other time.`
                        })
                    }

                    if(product.quantity < getCart.cart[i].quantity){
                        return res.status(400).json({
                            message: `quantity of ${product.label} available is ${product.quantity}, Please adjust your order accordingly. Thank you`
                        })
                    }
                }
            }
        })
        
        if(!check){

            const user : any = await AuthRepo.findUserById(userId)
            const userBalance : number = user?.balance
            if(userBalance === 0){
                return res.status(300).json({
                    status: 'Failed',
                    message: `Your balance is: $${userBalance}, top-up your account to continue.`
                })
            }
    
            const totalAmount : any = getCart.total
            if(userBalance < totalAmount) return res.status(200).json({
                status: 'Failed',
                message: `User balance: $${userBalance} not sufficient for Total payment:$${totalAmount}`
            })
    
            payload.amount = userBalance - totalAmount
            await CartRepo.deleteCart(getCart?.id)
            await AuthRepo.update(userId,payload )
    
            getCart?.cart.map(async (item : any) =>{
                for(let i = 0; i < getProduct.length; i++){
                    if(item.id === getProduct[i].id){
                        let update : any = {}
                        update.quantity = getProduct[i].quantity - item.quantity
                        update.quantity === 0 ? update.isAvailable = false : true
                        await ProductRepo.updateProduct(getProduct[i].label, update)
                    }
                }
            })
    
            return res.status(200).json({
                status: 'Success',
                message: 'Payment completed Successfully.',
                balance: payload.amount
            }) 
        }
    }
}

export default new AccountService()