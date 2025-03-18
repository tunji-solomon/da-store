import express from 'express';
import { ProductController } from '../controller';
import { authMiddleware, multerMiddleware } from '../middleware';

const router = express.Router()

router.get('/all', ProductController.getAll)
router.get('/find',ProductController.find)
router.use(authMiddleware.verifyToken, authMiddleware.isAdmin, multerMiddleware.single('image'))
router.post('/add',ProductController.add)
router.put('/update', ProductController.update)
router.delete('/delete/:id', ProductController.delete)

export default router

