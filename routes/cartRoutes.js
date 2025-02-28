const express = require('express')
const { CartController } =  require('../controller')
const { authMiddleware } = require('../middleware')

const router= express.Router()

router.post('/add-product/', authMiddleware.verifyToken, CartController.addToCart)
router.get('/view-items', authMiddleware.verifyToken, CartController.viewCart)
router.post('/remove-item', authMiddleware.verifyToken, CartController.removeItem)
router.delete('/delete', authMiddleware.verifyToken, CartController.deleteCart)

module.exports =  router