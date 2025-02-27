const { AccountService } = require("../services/index")
const { logger } = require("../utils/tools")


class AccountController {

    viewBalance = async (req, res) => {

        try {
            const getBalance = await AccountService.viewBalance(res)
            return getBalance
        } catch (error) {
            logger(error, res)
        }
    }

    addFund = async (req, res) => {

        try {
            const addFund = await AccountService.addFund(req.body, res)
            return addFund
        } catch (error) {
            logger(error, res)  
        }
    }

    checkout = async (req, res) => {

        try {
            const checkout = await AccountService.checkout(res)
            return checkout 
        } catch (error) {
            logger(error, res) 
        }
    }
}

module.exports = new AccountController()

