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

// home page
app.get("", async (req, res)=>{
    res.json({
        message: 'Welcome to our homepage'
    })
})

app.use('/', router)

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
})

