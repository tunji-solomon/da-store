import { AccountController } from "../controller";
import { authMiddleware }  from '../middleware';
import express from 'express';

const router = express.Router();

router.get("/view-balance", authMiddleware.verifyToken, AccountController.viewBalance);
router.post("/add-fund", authMiddleware.verifyToken, AccountController.addFund);
router.post("/checkout", authMiddleware.verifyToken, AccountController.checkout);

export default router;