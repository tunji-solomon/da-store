const  ProductController  = require('../controller/productController')
const { Router } = require('express')

const router = Router()

router.get('/', ProductController.getAll)
router.post('/product/add', ProductController.add)

module.exports = router

