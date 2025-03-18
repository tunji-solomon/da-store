import { AccountService }  from '../services'
import { logger } from '../utils/tools'
import { Response, Request } from 'express'


class AccountController {

    viewBalance = async (req : Request, res : Response) => {

        try {
            const getBalance : any = await AccountService.viewBalance(res)
            return getBalance
        } catch (error) {
            logger(error, res)
        }
    }

    addFund = async (req : Request, res : Response) => {

        try {
            const addFund : any = await AccountService.addFund(req.body, res)
            return addFund
        } catch (error) {
            logger(error, res)  
        }
    }

    checkout = async (req : Request, res : Response) => {

        try {
            const checkout : any = await AccountService.checkout(res)
            return checkout 
        } catch (error) {
            logger(error, res) 
        }
    }
}

export default new AccountController()

