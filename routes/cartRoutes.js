const express = require('express')
const { CartController } =  require('../controller')
const { authMiddleware } = require('../middleware')

const router= express.Router()

router.post('/add-product/:id', authMiddleware.verifyToken, CartController.addToCart)
router.get('/view-items', authMiddleware.verifyToken, CartController.viewCart)
router.post('/remove-item/:id', authMiddleware.verifyToken, CartController.removeItem)

module.exports =  router