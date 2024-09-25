const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error while connecting to db: ${error}`)
    }
}

module.exports = connectDB;