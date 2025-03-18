import mongoose from "mongoose"

const dbConnect = async ()=> {

    try {
        await mongoose.connect(String(process.env.DB_URL))
        console.log('Database connected successfully')

    } catch (error : any) {
        console.log(`connection to database failed`, error.message)
        process.exit(1)
    }
}

export default dbConnect
