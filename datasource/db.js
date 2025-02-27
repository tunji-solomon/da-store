const mongoose = require('mongoose')

const dbConnect = async ()=> {

    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Database connected successfully')

    } catch (error) {
        console.log(`connection to database failed`, error.message)
        process.exit(1)
    }
}


module.exports = {
    dbConnect
}

