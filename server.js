require('dotenv').config()
const express = require('express')
const { dbConnect } = require('./datasource/db')

const app = express()
const router = require('./routes/index')
const PORT = process.env.PORT || 1000

// Connect to db
dbConnect()

// express middleware
app.use(express.json())

app.use('/', router)

// home page
app.get("/", async (req, res)=>{
    res.json({
        message: 'Welcome to our homepage'
    })
})

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
})

