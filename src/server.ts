import { config }from'dotenv'
config()
import express, { Express } from 'express'
import dbConnect from './datasource/db'
import { Request, Response } from 'express'
import router from './routes'

const app : Express = express()
const PORT = process.env.PORT || 1000

// Connect to db
dbConnect()

// express middleware
app.use(express.json())

// home page
app.get("", async (req : Request, res : Response)=>{
    res.json({
        message: 'Welcome to our homepage'
    })
})

app.use('/', router)

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
})

