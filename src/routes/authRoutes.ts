import express from 'express'
import { AuthController } from '../controller'
import { authMiddleware } from '../middleware'

const router = express.Router()


router.post('/create', AuthController.createUser)
router.get('/users', AuthController.getAllUsers)
router.post('/login', AuthController.login)
router.post('/logout', authMiddleware.verifyToken,authMiddleware.isLoggedOut, AuthController.logout)

export default router

