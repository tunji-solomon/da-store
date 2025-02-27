const express = require('express')
const { ProductController }  = require('../controller/index')
const { authMiddleware, multerMiddleware } = require('../middleware/index')
const router = express.Router()

router.get('/', ProductController.getAll)
router.post('/add', authMiddleware.verifyToken,multerMiddleware.single('image'), ProductController.add)
router.get('/find', authMiddleware.verifyToken,ProductController.find)
router.put('/update',authMiddleware.verifyToken, multerMiddleware.single('image'), ProductController.update)

module.exports = router

