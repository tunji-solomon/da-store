const { AccountController } = require("../controller/index")
const { authMiddleware } = require('../middleware/index')

const express = require('express');
const router = express.Router();

router.get("/view-balance", authMiddleware.verifyToken, AccountController.viewBalance);
router.post("/add-fund", authMiddleware.verifyToken, AccountController.addFund);
router.post("/checkout", authMiddleware.verifyToken, AccountController.checkout);

module.exports = router;