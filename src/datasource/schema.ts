import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
    label: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    publicId: {
       type: String,
       required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    tag: {
        type: Array,
        required: true
    },
    isAvailable: { type : Boolean, default: true},
}, {timestamps : true })

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: String,
    password: String,
    role : { type : String, default : 'user'},
    balance: { type: Number, default: 0},
    isActive: { type : Boolean, default : false}
}, { timestamps : true })


const cartSchema = new mongoose.Schema({
    userId: String,
    cart: Array,
    total: Number,
    isCheckout: { type: Boolean, default : false }
},

{ timestamps : true })

const blackListSchema = new mongoose.Schema({
    token : String
},
{timestamps : true})

export {
    productSchema,
    userSchema,
    cartSchema,
    blackListSchema
}