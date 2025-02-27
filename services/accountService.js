const { AuthRepo, CartRepo, ProductRepo} = require('../repository/index')

class AccountService {

    viewBalance = async (res) => {

        const { userId } = res.locals.user
        const getUser = await AuthRepo.findUserById(userId)
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

    addFund = async (payload, res) => {

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

    checkout = async (res) => {

        const { userId } = res.locals.user;
        let payload = {};
        const getCart = await CartRepo.findByParameterOne(userId)
        if(!getCart) return res.status(404).json({
            status: 'Failed',
            message: 'User hasnt added any item to cart yet'
        })

        const user = await AuthRepo.findUserById(userId)
        const userBalance = user?.balance
        if(userBalance === 0){
            return res.status(300).json({
                status: 'Failed',
                message: `Your balance is: $${userBalance}, top-up your account to continue.`
            })
        }

        const totalAmount = getCart.total
        if(userBalance < totalAmount) return res.status(200).json({
            status: 'Failed',
            message: `User balance: $${userBalance} not sufficient for Total payment:$${totalAmount}`
        })

        payload.amount = userBalance - totalAmount
        await CartRepo.deleteCart(getCart?.id)
        await AuthRepo.update(userId,payload )
        const getProduct = await ProductRepo.getAllProduct()
        const quantity = getCart?.cart.filter(async (item) =>{
            for(let i = 0; i<getProduct.length; i++){
                if(item.id === getProduct[i].id){
                    console.log(item.id, 'VS', getProduct[i].id)
                    let update = {}
                    update.quantity = getProduct[i].quantity - item.quantity
                    await ProductRepo.updateProduct(getProduct[i].label, update)
                }
            }

        } )

        return res.status(200).json({
            status: 'Success',
            message: 'Payment completed Successfully.',
            balance: payload.amount
        })




    }

}

module.exports = new AccountService()