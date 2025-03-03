const express = require('express')
const productRoutes = require('./productRoute')
const authRoutes =  require('./authRoutes')
const accountRoutes = require('./accountRoutes')
const cartRoutes = require('./cartRoutes')
const { authMiddleware }= require('../middleware')
const router = express.Router()

router.use('/auth', authRoutes);
router.use(authMiddleware.isLoggedOut)
router.use('/product', productRoutes);
router.use('/account',accountRoutes);
router.use('/cart', cartRoutes)

module.exports = router