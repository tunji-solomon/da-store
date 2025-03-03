const express = require('express')
const { AuthController } = require('../controller')
const { authMiddleware } = require('../middleware')
const router = express.Router()


router.post('/create', AuthController.createUser)
router.get('/users', AuthController.getAllUsers)
router.post('/login', AuthController.login)
router.post('/logout', authMiddleware.verifyToken,authMiddleware.isLoggedOut, AuthController.logout)

module.exports = router

