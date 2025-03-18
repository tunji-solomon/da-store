import express from 'express'
import productRoutes from './productRoute'
import authRoutes from './authRoutes'
import accountRoutes from './accountRoutes'
import cartRoutes from './cartRoutes'
import { authMiddleware } from '../middleware'
const router = express.Router()

router.use('/auth', authRoutes);
router.use(authMiddleware.isLoggedOut)
router.use('/product', productRoutes);
router.use('/account',accountRoutes);
router.use('/cart', cartRoutes)

export default router