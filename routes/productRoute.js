const express = require('express')
const { ProductController }  = require('../controller/index')
const { authMiddleware, multerMiddleware } = require('../middleware/index')
const productController = require('../controller/productController')
const router = express.Router()

router.get('/', ProductController.getAll)
router.get('/find',ProductController.find)
router.use(authMiddleware.verifyToken, authMiddleware.isAdmin, multerMiddleware.single('image'))
router.post('/add',ProductController.add)
router.put('/update', ProductController.update)
router.delete('/delete/:id', productController.delete)

module.exports = router

