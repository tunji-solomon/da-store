const mongoose = require('mongoose')

const db = mongoose.connect('mongodb+srv://tunjisolomon10000:Tunejeey10@cluster0.wa8cg.mongodb.net/')
.then(console.log('Database connected successfully'))
.catch(err=> console.log(err.message))

module.exports = {
    mongoose,
    db
}

