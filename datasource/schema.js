const { mongoose } = require('./db')

const productSchema = new mongoose.Schema({
    label: String,
    price: Number,
    quantity: Number,
    isAvailable: { type : Boolean, default: true},
    createdAt: Date
})

module.exports = {productSchema}