const express = require('express')
const app = express()
const router = require('./routes/productRoute')

const PORT = 1000

app.use(express.json())

app.use('/da-store/', router)

// home page
app.get("/", async (req, res)=>{
    res.json({
        message: 'Welcome to our homepage'
    })
})

// get all product
app.get("/product", async (req, res)=>{

})

// get product by Id
app.get("/product/:id", (req, res)=>{

    const getProduct = product.find(item => item.id === parseInt(req.params.id));
    if(!getProduct) return res.status(404).json({
        message: 'product with Id not found, try a different id'
    })

    res.status(200).json({
        message: 'success',
        data: getProduct
    })
})

// add product
app.post('/product/add', async (req, res) => {

    const { label } = req.body
    const payload = req.body
    const isProductExist =  await Product.findByParameter(label)
    if(isProductExist.length > 0){
        payload.quantity += isProductExist[0].quantity
        await Product.updateProduct(label,payload)
        return res.json(updated)
    }

    const newProduct = await addProduct(req.body)
    res.json({

        message: 'Product added succesfully',
        data: newProduct
    })
})

// update single product
app.put('/product/update/', async (req, res) => {
    const payload = req.body
    const getProduct = await Product.findByParameter(payload.label)
    if( getProduct.length === 0 ) return res.status(404).send(`product with Label ${payload.label} not found`)

    await Product.updateProduct(getProduct.label, payload)

    res.status(201).json({
        message: 'Data updated succesfully'
    })

})

app.delete('/product/delete/:id', (req, res) => {

    const deletedProduct = product.find( item => item.id == req.params.id)
    product = product.filter( item => item.id !== deletedProduct.id)

    res.json(product)

})

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
})

