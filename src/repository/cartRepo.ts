import { cartModel } from '../datasource/model'

class cartRepo {

    addProduct = async (id : string, payload : any) => {
        
        const cartExist : any = await cartModel.findOne({userId:id}).select('-userId -_id -__v')
        if(!cartExist){
            return await cartModel.create({
                userId: payload.userId,
                cart: payload.cart,
                total: payload.total
            })
        } 
        
        cartExist?.cart.push(payload.cart);
        const update : any = cartExist?.cart;
        const total : number = payload.total + cartExist?.total
        return await cartModel.updateOne({ userId:id},
            {
                cart: update,
                total: total
            }
        )

    }


    findByParameterOne = async (parameter : any) => {
        return await cartModel.findOne({
            $or: [
                {_id: parameter},
                {userId: parameter},
            ]
        })
  
    }


    updateOne = async (id : string, payload : any) => {
        const cartExist : any = await cartModel.findOne({userId:id}).select('-userId  -_id -__v')
        for(let i=0; i < cartExist.cart.length; i++){
            if(cartExist.cart[i].id  === payload.id){
                cartExist.cart[i] = {
                    id : payload.id,
                    label : payload.label,
                    price : payload.price,
                    quantity : payload.quantity
                }
            }

             cartExist.cart[-1] = payload
        }
        const total : number = cartExist.total + payload.totalOrderPrice
        const update : any = cartExist?.cart;
        return await cartModel.updateOne({userId:id},
            {
                cart : update,
                total : total

            }
        )   
    }

    removeItem = async (id : string, payload : any) => {
        const existingCart : any = await cartModel.findOne({userId : id}).select('-userId  -_id -__v')
        let updateCart;
        updateCart = existingCart?.cart.filter((item : any ) => {
            if(item.id === payload.id){
                if(item.quantity > 1){
                    item.quantity = item.quantity - payload.quantity
                }else{
                    const newCart : any = existingCart.cart.splice(existingCart.cart.indexOf(item), 1)
                    return

                }
            }
            return item
            })

        const total : number = existingCart?.total - (payload.price * payload.quantity)
        return await cartModel.updateOne({userId : id},
            {
                cart : updateCart,
                total : total
            }
        )
    }

    deleteCart = async (id : string) => {
        return await cartModel.findByIdAndDelete(id)
    }
}


export default new cartRepo()